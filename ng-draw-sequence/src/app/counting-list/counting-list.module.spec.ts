import { CountingListModule } from './counting-list.module';

describe('CountingListModule', () => {
  let countingListModule: CountingListModule;

  beforeEach(() => {
    countingListModule = new CountingListModule();
  });

  it('should create an instance', () => {
    expect(countingListModule).toBeTruthy();
  });
});
