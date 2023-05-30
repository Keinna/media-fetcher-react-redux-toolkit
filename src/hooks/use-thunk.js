import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    //useCallback keeps from getting infinate loop
    const runThunk = useCallback(
        (arg) => {
            setIsLoading(true);
            //returns promise, always goes into .then also when fails -> unwrap()
            dispatch(thunk(arg))
                .unwrap()
                .catch((error) => setError(error))
                .finally(() => setIsLoading(false));
        },
        [dispatch, thunk],
    );

    return [runThunk, isLoading, error];
}
