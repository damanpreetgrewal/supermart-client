import React from 'react';
import Image from 'next/image';

//internal import
import Layout from '@layout/Layout';
import PageHeader from '@component/header/PageHeader';

const AboutUs = () => {
  return (
    <Layout title='About Us' description='This is about us page'>
      <PageHeader title='About Us' />

      <div className='bg-white'>
        <div className='max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10'>
          <div className='grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-16 items-center'>
            <div className=''>
              <h3 className='text-xl lg:text-3xl mb-2 font-serif font-semibold'>
                Welcome to Supermart
              </h3>
              <div className='mt-3 text-base opacity-90 leading-7'>
                <p>
                  Welcome to Supermart - your go-to grocery store in Kitchener!
                  We are committed to providing our customers with a convenient
                  and enjoyable shopping experience, with a wide selection of
                  fresh, high-quality groceries at competitive prices.
                </p>

                <p>
                  Our store features everything you need to stock your pantry,
                  fridge, and freezer, including fresh produce, meats, dairy
                  products, baked goods, and more. We also offer a variety of
                  international foods and specialty items, so you can explore
                  new flavors and cuisines.
                </p>
              </div>
              <div className='grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8'>
                <div className='p-8 bg-indigo-50 shadow-sm rounded-lg'>
                  <span className='text-3xl block font-extrabold font-serif mb-4 text-gray-800'>
                    10K
                  </span>
                  <h4 className='text-lg font-serif font-bold mb-1'>
                    Listed Products
                  </h4>
                  <p className='mb-0 opacity-90 leading-7'>
                    Come visit us at Supermart and see our impressive selection
                    of over 10,000 products for yourself!{' '}
                  </p>
                </div>
                <div className='p-8 bg-indigo-50 shadow-sm rounded-lg'>
                  <span className='text-3xl block font-extrabold font-serif mb-4 text-gray-800'>
                    8K
                  </span>
                  <h4 className='text-lg font-serif font-bold mb-1'>
                    Lovely Customer
                  </h4>
                  <p className='mb-0 opacity-90 leading-7'>
                    We take pride in offering competitive prices on all our
                    products, so you can stock up on everything you need without
                    breaking the bank.{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-10 lg:mt-0'>
              <Image width={920} height={750} src='/about-us.jpg' alt='logo' />
            </div>
          </div>
          <div className='mt-10 lg:mt-16 text-base opacity-90 leading-7'>
            <p>
              At Supermart, we value our customers and strive to provide
              exceptional service. Our knowledgeable staff is always available
              to help you find what you need and answer any questions you may
              have. We are committed to ensuring that you leave our store
              satisfied with your purchases and eager to return.{' '}
            </p>

            <p>
              {' '}
              Whether you're stocking up for the week, preparing for a special
              occasion, or just looking for a quick snack, Supermart has
              everything you need. We look forward to serving you soon!
            </p>
          </div>
          <div className='mt-10 lg:mt-12 flex flex-col sm:grid gap-4'>
            <Image
              width={1920}
              height={570}
              src='/about-banner.jpg'
              alt='logo'
              className='block rounded-lg'
            />
          </div>
        </div>
        <div className='bg-gray-50 lg:py-20 py-10'>
          <div className='max-w-screen-2xl mx-auto px-3 sm:px-10'>
            <div className='relative flex flex-col sm:flex-row sm:items-end justify-between mb-8'>
              <div className='max-w-2xl'>
                <h3 className='text-xl lg:text-3xl mb-2 font-serif font-semibold'>
                  Our Founder
                </h3>
                <p className='mt-2 md:mt-3 font-normal block text-base'>
                  Our founder is an accomplished Full Stack Developer with over
                  7 years of experience in the IT industry. Throughout their
                  career, they have gained extensive expertise in software
                  analysis, design, development, implementation, and testing of
                  object-oriented applications and web-based enterprise
                  applications in the banking and finance/insurance domain.
                  Their mastery of ReactJS and NodeJS has allowed them to build
                  highly functional and scalable applications that meet the
                  needs of clients and end-users alike. With a keen eye for
                  detail and a passion for delivering top-quality results, our
                  founder has earned a reputation as a skilled and reliable
                  developer. Beyond their technical skills, our founder is also
                  a natural problem solver, able to quickly identify and
                  troubleshoot issues as they arise. Their ability to work well
                  under pressure and collaborate effectively with team members
                  has made them a valuable asset on numerous projects. Overall,
                  our founder's experience, expertise, and dedication make them
                  an exceptional leader and a driving force behind the success
                  of our organization.
                </p>
              </div>
            </div>
            <div className='grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-6 xl:gap-x-8'>
              <div className='max-w-sm'>
                <Image
                  width={420}
                  height={420}
                  src='/team/team-1.jpg'
                  alt='logo'
                  className='block rounded-lg'
                />
                <div className='py-4'>
                  <h5 className='text-lg font-semibold font-serif'>
                    Damanpreet Grewal
                  </h5>
                  <span className='opacity-75 text-sm'>Founder & CEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
