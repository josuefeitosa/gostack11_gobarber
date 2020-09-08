import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jest Tester',
      email: 'jest@test.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.name).toBe('Jest Tester');
    expect(profile.email).toBe('jest@test.com');
  });

  it('should not be able to show an unexisting user profile', async () => {
    await fakeUsersRepository.create({
      name: 'Jest Tester',
      email: 'jest@test.com',
      password: '123456',
    });

    await expect(
      showProfileService.execute({
        user_id: 'Non-existing user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
