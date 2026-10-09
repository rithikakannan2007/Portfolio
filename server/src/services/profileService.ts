import { Profile, IProfile } from '../models/Profile';

export class ProfileService {
  public async getProfile(): Promise<IProfile> {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: 'Alex Morgan',
        title: 'Full-Stack Developer & Cloud Architect',
        shortIntro: 'A passionate Full-Stack Developer who enjoys building modern, accessible, and user-friendly web applications.',
        bio: 'With over 5 years of engineering experience across React, TypeScript, Node.js, and cloud architectures, I specialize in taking products from zero to production scale with clean design and rigorous security.',
        email: 'alex.morgan.dev@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        status: 'Open to full-time roles & consulting'
      });
    }
    return profile;
  }

  public async updateProfile(data: Partial<IProfile>): Promise<IProfile> {
    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, data);
      return await profile.save();
    } else {
      const newProfile = new Profile(data);
      return await newProfile.save();
    }
  }
}

export const profileService = new ProfileService();
