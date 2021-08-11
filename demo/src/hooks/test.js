function useMyState(incitialState) {
  const [myState, setMyState] = useState(initialState);
  const ref = useRef();
  const setMyStateCb = (state, cb) => {
    setMyState(state);
    ref.current = cb;
  };

  useEffect(() => {
    ref.current(myState);
  }, [myState]);

  return [myState, setMyStateCb];
}

const [a, setA] = useMyState(1);

setA(2, (value) => {
  console.log(value);
});
