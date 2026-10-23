import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./store.ts";

export const useAppDispath = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();