import tradeRequestMutations from './tradeRequest';
import userMutations from './user';
import bookMutations from './book';

export default {
  ...tradeRequestMutations,
  ...userMutations,
  ...bookMutations
}
