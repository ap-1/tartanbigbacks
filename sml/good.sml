fun noNone ([] : int option list) : bool = true
  | noNone (NONE::_) = false
  | noNone (SOME _::xs) = noNone xs
