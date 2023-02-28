import { combineReducers } from '@reduxjs/toolkit';

import player from './Reducers/player';

const reducers = combineReducers({
    player,
})

export default reducers;