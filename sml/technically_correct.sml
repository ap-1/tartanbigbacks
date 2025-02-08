fun noNone ([] : int option list) : bool = true
  | noNone (x::xs) : bool = if x = NONE then false else noNone xs
