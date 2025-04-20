import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import { ImagePost } from '../types';
import { AiFillHeart } from 'react-icons/ai';

interface IProps {
  post: ImagePost;
  isShowingOnHome?: boolean;
}

const ImageCard: NextPage<IProps> = ({ post: { caption, postedBy, image_post, _id, likes }, isShowingOnHome }) => {
  // const [isHover, setIsHover] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  console.log(image_post);


  if (!isShowingOnHome) {
    return (
      <div>
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
          <div>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
              <div className='md:w-16 md:h-16 w-10 h-10'>
                <Link href={`/profile/${postedBy?._id}`}>
                  <>
                    <Image
                      width={62}
                      height={62}
                      className=' rounded-full'
                      src={postedBy?.image}
                      alt='user-profile'
                      layout='responsive'
                    />
                  </>
                </Link>
              </div>
              <div>
                <Link href={`/profile/${postedBy?._id}`}>
                  <div className='flex items-center gap-2'>
                    <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                      {postedBy?.userName}{' '}
                      <GoVerified className='text-blue-400 text-md' />
                    </p>
                    <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                      {postedBy?.userName}
                    </p>
                  </div>
                </Link>
                <br />
              </div>
            </div>
          </div>
          <div>
            <Link href={`/detail/${_id}`}>
                  <Image
                    width="3840"
                    height="2160"
                    objectFit="contain"
                    alt="Post"
                    priority={true}
                    ref={imageRef}
                    src={image_post.asset.url}
                    className='w-[250px] md:w-full rounded-xl cursor-pointer'
                  />
            </Link>
            <div className='flex gap-2 -mt-8 items-center ml-4'>
              <p className='text-white text-lg font-medium flex gap-1 items-center'>
                <AiFillHeart className='text-2xl' style={{ color: '#ff69b4' }} />
                {likes?.length || 0}
              </p>
            </div>
            <Link href={`/`}>
              <p className='w-[100%] mt-5 text-md text-gray-800 cursor-pointer w-210'>
                {caption}
              </p>
            </Link>

            <div className='lg:ml-20 flex gap-4 relative'>
              {/* <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className='rounded-3xl'
              >
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // return (
  //   <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
  //     <div>
  //       <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
  //         <div className='md:w-16 md:h-16 w-10 h-10'>
  //           <Link href={`/profile/${postedBy?._id}`}>
  //             <>
  //               <Image
  //                 width={62}
  //                 height={62}
  //                 className=' rounded-full'
  //                 src={postedBy?.image}
  //                 alt='user-profile'
  //                 layout='responsive'
  //               />
  //             </>
  //           </Link>
  //         </div>
  //         <div>
  //           <Link href={`/profile/${postedBy?._id}`}>
  //             <div className='flex items-center gap-2'>
  //               <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
  //                 {postedBy?.userName}{' '}
  //                 <GoVerified className='text-blue-400 text-md' />
  //               </p>
  //               <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
  //                 {postedBy?.userName}
  //               </p>
  //             </div>
  //           </Link>
  //           <br />
  //           <Link href={`/`}>
  //             <p className='mt-2 font-normal '>{caption}</p>
  //           </Link>
  //           {/* <div>
  //             {image_post && image_post ? (
  //               <Link href={`/detail/${_id}`}>
  //                 <Image
  //                   width="3840"
  //                   height="2160"
  //                   objectFit="contain"
  //                   alt="Post"
  //                   priority={true}
  //                   src={image_post.asset.url}
  //                   className='w-[250px] md:w-full rounded-xl cursor-pointer'
  //                 />
  //               </Link>
  //             ) : (
  //               <div className="w-[250px] md:w-full rounded-xl bg-gray-200 flex items-center justify-center" style={{ height: '200px' }}>
  //                 <p className="text-gray-500">No Post available</p>
  //               </div>
  //             )}
  //             <div className='flex gap-2 -mt-8 items-center ml-4'>
  //               <p className='text-white text-lg font-medium flex gap-1 items-center'>
  //                 <AiFillHeart className='text-2xl' style={{ color: '#ff69b4' }} />
  //                 {likes?.length || 0}
  //               </p>
  //             </div>
  //             <Link href={`/`}>
  //               <p className='mt-5 text-md text-gray-800 cursor-pointer w-210'>
  //                 {caption}
  //               </p>
  //             </Link>
  //           </div> */}
  //         </div>
  //       </div>
  //     </div>
  //     <div className='lg:ml-20 flex gap-4 relative'>
  //       <div
  //         onMouseEnter={() => setIsHover(true)}
  //         onMouseLeave={() => setIsHover(false)}
  //         className='rounded-3xl'
  //       >
  //         <Link href={`/detail/${_id}`}>
  //           <video
  //             loop
  //             ref={imageRef}
  //             src={image_post.asset.url}
  //             className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
  //           ></video>
  //         </Link>
  //       </div>
  //     </div>

  //   </div>);
};

export default ImageCard;