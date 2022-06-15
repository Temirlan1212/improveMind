import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice/AuthSlice";
import CardSlices from "../slices/CardSlices/CardSlices";
import ChapterSlices from "../slices/ChapterSlices/ChapterSlices";
import MenuToggleSlice from "../slices/MenuToggleSlice/MenuToggleSlice";
import RatingSlice from "../slices/RatingSlice/RatingSlice";
import SwitchSlices from "../slices/SwitchSlices/SwitchSlices";

export default configureStore({
  reducer: {
    card: CardSlices,
    chapter: ChapterSlices,
    switch: SwitchSlices,
    auth: AuthSlice,
    menuToggle: MenuToggleSlice,
    rating: RatingSlice,
  },
});
