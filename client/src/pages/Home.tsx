import React from 'react';
import Sidebar from '../Sidebar';

function Home() {
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-80">
          <div className="mr-64 p-20 pt-24 border-r-[1.5px] h-full right-0">
            <div className="p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <time className="text-lg font-semibold text-gray-900 dark:text-white">August 22, 2023</time>
              <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                <li>
                  <div className="items-center block p-3 sm:flex">
                    <img className="w-12 h-12 mb-3 mr-5 rounded-full sm:mb-0" src="/images/sample-photo1.png" alt="sample-photo1" />
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">Kevin Yoon</span> recommends <span className="font-medium text-gray-900 dark:text-white">In-N-Out.</span>
                      </div>
                      <div className="text-sm font-normal">"Make sure to get that animal style fries!"</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">1 day ago &middot; San Francisco, CA</span>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            <div className="p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <time className="text-lg font-semibold text-gray-900 dark:text-white">Last Week</time>
              <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                <li>
                  <div className="items-center block p-3 sm:flex">
                    <img className="w-12 h-12 mb-3 mr-5 rounded-full sm:mb-0" src="/images/sample-photo2.png" alt="sample-photo2" />
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">William Nguyen</span> recommends <span className="font-medium text-gray-900 dark:text-white">Tim Hortons.</span>
                      </div>
                      <div className="text-sm font-normal">"Poutine all the way!"</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Aug, 17 2023 &middot; Toronto, CN</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="items-center block p-3 sm:flex">
                    <img className="w-12 h-12 mb-3 mr-5 rounded-full sm:mb-0" src="/images/sample-photo3.png" alt="sample-photo3" />
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">Andrew Larkin</span> recommends <span className="font-medium text-gray-900 dark:text-white">Five Guys.</span>
                      </div>
                      <div className="text-sm font-normal">"I think Five Guys is the best burger chain nationwide."</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Aug, 16 2023 &middot; New York, NY</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="items-center block p-3 sm:flex">
                    <img className="w-12 h-12 mb-3 mr-5 rounded-full sm:mb-0" src="/images/sample-photo2.png" alt="sample-photo2" />
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">William Nguyen</span> recommends <span className="font-medium text-gray-900 dark:text-white">Pizza Hut.</span>
                      </div>
                      <div className="text-sm font-normal">"Craving pizza today."</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Aug, 14 2023 &middot; Toronto, CN</span>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            <div className="p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <time className="text-lg font-semibold text-gray-900 dark:text-white">Last Month</time>
              <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                <li>
                  <div className="items-center block p-3 sm:flex">
                    <img className="w-12 h-12 mb-3 mr-5 rounded-full sm:mb-0" src="/images/sample-photo4.png" alt="sample-photo4" />
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">William Nguyen</span> recommends
                        <span className="font-medium text-gray-900 dark:text-white">Florida's Finest.</span>
                      </div>
                      <div className="text-sm font-normal">"Best food in town."</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Jul, 17 2023 &middot; Miami, FL</span>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
