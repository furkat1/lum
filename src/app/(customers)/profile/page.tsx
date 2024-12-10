import { ProfileForm } from '@/features/profile/components/profile-form';
import { MaxWidthContainer } from '@/components/layout/max-width-container';
import { getSession } from '@/lib/auth';

export default async function Profile() {
  const session = await getSession();
  return (
      <MaxWidthContainer>
        <ProfileForm session={session}/>
      </MaxWidthContainer>
  );
}
