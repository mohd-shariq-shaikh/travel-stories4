import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import ImageCard from '../../components/ImageCard';
import NoResults from '../../components/NoResults';
import { IUser, ImagePost } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
  data: {
    user: IUser;
    userImages: ImagePost[];
    userLikedImages: ImagePost[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showuserImages, setShowuserImages] = useState<Boolean>(true);
  const [imagesList, setimagesList] = useState<ImagePost[]>([]);

  const { user, userImages, userLikedImages } = data;
  const images = showuserImages ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showuserImages ? 'border-b-2 border-black' : 'text-gray-400';
  console.log(imagesList);

  useEffect(() => {
    const fetchImages = async () => {
      if (showuserImages) {
        setimagesList(userImages);
      } else {
        setimagesList(userLikedImages);
      }
    };

    fetchImages();
  }, [showuserImages, userLikedImages, userImages]);

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            layout='responsive'
            className='rounded-full'
            src={user.image}
            alt='user-profile'
          />
        </div>

        <div>
          <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
            <span>{user.userName.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md' />
          </div>
          <p className='text-sm font-medium'> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer ${images} mt-2`} onClick={() => setShowuserImages(true)}>
            Images
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowuserImages(false)}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {imagesList.length > 0 ? (
            imagesList.map((post: ImagePost, idx: number) => (
              <ImageCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showuserImages ? '' : 'Liked'} Images Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};
export default Profile;