import { ContributeModule } from './contribute.module';

describe('ContributeModule', () => {
  let contributeModule: ContributeModule;

  beforeEach(() => {
    contributeModule = new ContributeModule();
  });

  it('should create an instance', () => {
    expect(contributeModule).toBeTruthy();
  });
});
