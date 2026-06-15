import {createPhotoCards} from './data';
import { getIsWithinWorkDay } from './functions';

createPhotoCards();
console.log(getIsWithinWorkDay('08:00', '17:30', '14:00', 90));
console.log(getIsWithinWorkDay('8:0', '10:0', '8:0', 120));
console.log(getIsWithinWorkDay('08:00', '14:30', '14:00', 90));
console.log(getIsWithinWorkDay('14:00', '17:30', '08:0', 90));
console.log(getIsWithinWorkDay('8:00', '17:30', '08:00', 900));
