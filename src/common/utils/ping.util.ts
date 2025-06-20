import { Logger } from '@nestjs/common';
import axios from 'axios';
import { BASE_URL } from '../configs/constants';

export async function pingSelf() {
  try {
    const { data } = await axios.get(<string>`${BASE_URL}`);

    Logger.log(`Server pinged successfully: ${data.message}`);
    return true;
  } catch (e: unknown) {
    if (e instanceof Error) Logger.log(`Error message: ${e.message}`);
    return;
  }
}

setInterval(pingSelf, 600000); //10 minutes
