import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-80">
          <main className="mr-64 p-20 pt-10 border-r-[1.5px] h-full right-0">
            <div className="p-5 mb-4 border-b-[1.5px] bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex items-center">
              <div className="w-[200px]">
                <img className="rounded-full w-28 h-28 m-auto" src="https://avatars.githubusercontent.com/u/31088037?v=4" alt="profile"></img>
                <h3 className="font-bold text-xl mt-2 text-center">Andrew Larkin</h3>
                <p className="pl-8 text-sm text-gray-900">Joined Aug 23, 2023</p>
              </div>
              <div className="mb-14">
                <div className="flex items-center">
                  <div className="ml-8 mr-5 text-center">
                    <p>25</p>
                    <p>Recs</p>
                  </div>
                  <div className="m-5 text-center ">
                    <p>10</p>
                    <p>Followers</p>
                  </div>
                  <div className="m-5 text-center ">
                    <p>35</p>
                    <p>Following</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-12">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">My Activity</p>
              <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                <li>
                  <div className="items-center block mt-8 sm:flex">
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">Andrew Larkin</span> recommends <span className="font-medium text-gray-900 dark:text-white">Five Guys.</span>
                      </div>
                      <div className="text-sm font-normal">"I think Five Guys is the best burger chain nationwide."</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Aug, 16 2023 &middot; New York, NY</span>
                    </div>
                  </div>
                  <div className="items-center block mt-5 sm:flex">
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">Andrew Larkin</span> recommends <span className="font-medium text-gray-900 dark:text-white">McDonalds.</span>
                      </div>
                      <div className="text-sm font-normal">"I think Five Guys is the best burger chain nationwide."</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Aug, 16 2023 &middot; New York, NY</span>
                    </div>
                  </div>
                  <div className="items-center block mt-5 sm:flex">
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">Andrew Larkin</span> recommends <span className="font-medium text-gray-900 dark:text-white">Taco Bell.</span>
                      </div>
                      <div className="text-sm font-normal">"I think Five Guys is the best burger chain nationwide."</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Aug, 16 2023 &middot; New York, NY</span>
                    </div>
                  </div>
                  <div className="items-center block mt-5 sm:flex">
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">Andrew Larkin</span> recommends <span className="font-medium text-gray-900 dark:text-white">Shake Shack.</span>
                      </div>
                      <div className="text-sm font-normal">"I think Five Guys is the best burger chain nationwide."</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Aug, 16 2023 &middot; New York, NY</span>
                    </div>
                  </div>
                  <div className="items-center block mt-5 sm:flex">
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">Andrew Larkin</span> recommends <span className="font-medium text-gray-900 dark:text-white">Wahlburgers.</span>
                      </div>
                      <div className="text-sm font-normal">"I think Five Guys is the best burger chain nationwide."</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">Aug, 16 2023 &middot; New York, NY</span>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Profile;
