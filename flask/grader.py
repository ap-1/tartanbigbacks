from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import subprocess
import os
import uuid
import re

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "submissions"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))

def check_style_violations(filename):
    with open('sources.mlb', 'w') as f:
        f.write(filename)
    result = subprocess.run(['./millet', '.'], capture_output=True, text=True)
    sanitized_stderr = re.sub('\x1b[[0-9;]*m', '', result.stderr)
    if sanitized_stderr == '':
        sanitized_stderr = 'no style issues!'
    return sanitized_stderr

def sml_errored(s):
    t = s.lower()
    return 'error' in t or 'exception' in t

def run_testcases(filename, tests_file):
    # read all lines in tests.sml
    with open(tests_file) as f:
        lines = [line.rstrip() + ';' for line in f]
    test_results = []
    # run the tests
    for line in lines:
        try:
            result = subprocess.run(['sml', filename], input=line, capture_output=True, text=True, timeout=5)
            test_results.append(not sml_errored(result.stdout))
        except subprocess.TimeoutExpired:
            test_results.append(False)
    assert len(test_results) == len(lines)
    return test_results

@app.route("/submit/<problem>", methods=["POST"])
def upload_sml_file(problem):
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    fname_stem = uuid.uuid4()
    fname = os.path.join(UPLOAD_FOLDER, f'{fname_stem}.sml')
    file.save(fname)

    try:
        return jsonify({
            'style': check_style_violations(fname),
            'tests': run_testcases(fname, os.path.join('tests/', f'{problem}_tests.sml')),
            'submission_id': fname_stem})
    except FileNotFoundError:
        return jsonify({'error': f'Invalid problem name: {problem}', 'submission_id': fname_stem}), 400
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Execution timed out", 'submission_id': fname_stem}), 400
    except Exception as e:
        return jsonify({"error": str(e), 'submission_id': fname_stem}), 500

@app.route('/submissions/<submission_id>', methods=['GET'])
def read_submission(submission_id):
    try:
        with open(os.path.join(UPLOAD_FOLDER, f'{submission_id}.sml')) as f:
            return Response(f.read(), mimetype='text/plain')
    except FileNotFoundError:
        return 'Submission does not exist', 404

if __name__ == "__main__":
    #context = ('server.crt', 'server.key')#certificate and key files
    #app.run(host='0.0.0.0', debug=True, ssl_context=context)
    app.run(host='0.0.0.0', debug=True)