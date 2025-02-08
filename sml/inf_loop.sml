fun noNone ([] : int option list) : bool = true
  | noNone (L) = noNone L
