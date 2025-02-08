fun noNone ([] : int option list) : bool = true
  | noNone (x::xs) = false
