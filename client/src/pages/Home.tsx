import Sidebar from '../Sidebar';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { getNewsfeed } from '../features/newsfeed/newsfeedSlice';

interface NewsfeedItem {
  recs_id: number;
  user_id: number;
  restaurant_id: number;
  review: string;
  created_at: string;
}

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const newsfeed: NewsfeedItem[] = useSelector((state: RootState) => state.newsfeed.newsfeed);
  const { isError, isSuccess } = useSelector((state: RootState) => state.newsfeed);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    dispatch(getNewsfeed() as any);
  }, [user, navigate, isError, dispatch, isSuccess]);

  const thisWeek: NewsfeedItem[] = [];
  const lastWeek: NewsfeedItem[] = [];
  const lastMonth: NewsfeedItem[] = [];
  const beyond: NewsfeedItem[] = [];

  const sortedNewsfeed = [...newsfeed].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const now = new Date().getTime();

  sortedNewsfeed.forEach((item) => {
    const createdAt = new Date(item.created_at).getTime();
    const timeDifference = now - createdAt;
    // number of days * hours * min * sec * ms
    if (timeDifference <= 7 * 24 * 60 * 60 * 1000) {
      thisWeek.push(item);
      // number of 2 weeks
    } else if (timeDifference <= 14 * 7 * 24 * 60 * 60 * 1000) {
      lastWeek.push(item);
      // number of 1 month
    } else if (timeDifference <= 30 * 24 * 60 * 60 * 1000) {
      lastMonth.push(item);
    } else {
      beyond.push(item);
    }
  });

  return (
    <>
      <div className="flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-80">
          <div className="mr-64 p-20 pt-24 border-r-[1.5px] h-full right-0 bg-gray-50">
            <time className="text-lg font-semibold text-gray-900 dark:text-white">This Week</time>
            <div className="mt-3 p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              {thisWeek.map((item) => (
                <ol key={item.recs_id} className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                  <li>
                    <div className="items-center block p-3 sm:flex">
                      <div className="text-gray-600 dark:text-gray-400">
                        <div className="text-base font-normal">
                          <span className="font-medium text-gray-900 dark:text-white">{item.user_id}</span> recommends{' '}
                          <span className="font-medium text-gray-900 dark:text-white">{item.restaurant_id}.</span>
                        </div>
                        <div className="text-sm font-normal">"{item.review}"</div>
                        <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                          {new Date(item.created_at).toLocaleDateString('en-US')} &middot;{' '}
                          {new Date(item.created_at).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true,
                          })}{' '}
                          &middot; San Francisco, CA
                        </span>
                      </div>
                    </div>
                  </li>
                </ol>
              ))}
            </div>
            <time className="text-lg font-semibold text-gray-900 dark:text-white">Last Week</time>
            <div className="mt-3 p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              {lastWeek.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No history</p>
              ) : (
                lastWeek.map((item) => (
                  <ol key={item.recs_id} className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
                    <li>
                      <div className="items-center block p-3 sm:flex">
                        <div className="text-gray-600 dark:text-gray-400">
                          <div className="text-base font-normal">
                            <span className="font-medium text-gray-900 dark:text-white">{item.user_id}</span> recommends{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{item.restaurant_id}.</span>
                          </div>
                          <div className="text-sm font-normal">"{item.review}"</div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                            {new Date(item.created_at).toLocaleDateString('en-US')} &middot;{' '}
                            {new Date(item.created_at).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric',
                              hour12: true,
                            })}{' '}
                            &middot; San Francisco, CA
                          </span>
                        </div>
                      </div>
                    </li>
                  </ol>
                ))
              )}
            </div>
            <time className="text-lg font-semibold text-gray-900 dark:text-white">Last Month</time>
            <div className="mt-3 p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              {lastMonth.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No history</p>
              ) : (
                lastMonth.map((item) => (
                  <ol key={item.recs_id} className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
                    <li>
                      <div className="items-center block p-3 sm:flex">
                        <div className="text-gray-600 dark:text-gray-400">
                          <div className="text-base font-normal">
                            <span className="font-medium text-gray-900 dark:text-white">{item.user_id}</span> recommends{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{item.restaurant_id}.</span>
                          </div>
                          <div className="text-sm font-normal">"{item.review}"</div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                            {new Date(item.created_at).toLocaleDateString('en-US')} &middot;{' '}
                            {new Date(item.created_at).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric',
                              hour12: true,
                            })}{' '}
                            &middot; San Francisco, CA
                          </span>
                        </div>
                      </div>
                    </li>
                  </ol>
                ))
              )}
            </div>
            <time className="text-lg font-semibold text-gray-900 dark:text-white">Beyond</time>
            <div className="mt-3 p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              {beyond.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No history</p>
              ) : (
                beyond.map((item) => (
                  <ol key={item.recs_id} className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
                    <li>
                      <div className="items-center block p-3 sm:flex">
                        <div className="text-gray-600 dark:text-gray-400">
                          <div className="text-base font-normal">
                            <span className="font-medium text-gray-900 dark:text-white">{item.user_id}</span> recommends{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{item.restaurant_id}.</span>
                          </div>
                          <div className="text-sm font-normal">"{item.review}"</div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                            {new Date(item.created_at).toLocaleDateString('en-US')} &middot;{' '}
                            {new Date(item.created_at).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric',
                              hour12: true,
                            })}{' '}
                            &middot; San Francisco, CA
                          </span>
                        </div>
                      </div>
                    </li>
                  </ol>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
