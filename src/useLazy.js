import { useState, useEffect } from 'react';

export default function useLazy(promise, onPending){
  const [value, setValue] = useState(onPending)
  
  let [cancelled, setCancelled] = useState(false)

  promise.then((x) => {
    if(!cancelled){
      setValue(x)
      setCancelled(true)
    }
  })

  useEffect(() => () => setCancelled(true))

  return value
}