import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NoResults from '../components/NoResults';
import ImageCard from '../components/ImageCard';
import { ImagePost } from '../types';
import { BASE_URL } from '../utils';
import { MdOutlineBrokenImage } from 'react-icons/md';
interface IProps {
  images: ImagePost[]
}
const Home = ({ images }: IProps) => {

  return (
    <>
      <div className='flex flex-col gap-10 images h-full'>
        {images?.length > 0 ? (
          images.map((image_post: ImagePost) => (
            <ImageCard post={image_post} key={image_post._id} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <MdOutlineBrokenImage className="text-6xl text-gray-500" />
            <p className="text-gray-500 text-lg mt-2">No Images Available</p>
          </div>
        )}
      </div>
      {/* <div className='flex flex-col gap-10 images h-full'>
      {images.length
       ? images?.map((image: ImagePost) => (
          <ImageCard post={image} key={image._id} />
        )
      ) 
        : <NoResults text={`No Images`} />}
    </div> */}
    </>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { images: response.data },
  };
}

export default Home
