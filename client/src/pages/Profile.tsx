import Sidebar from '../Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { getNewsfeed, getMyReviews } from '../features/newsfeed/newsfeedSlice';
import { useEffect } from 'react';
import { getMyFollowers } from '../features/myFriends/myFriendsSlice';
import { getMyFriends } from '../features/myFriends/myFriendsSlice';

interface NewsfeedItem {
  created_at: string;
  name: string;
  restaurant_name: string;
  review: string;
}
interface User {
  email: string;
  fullName: string;
  joined: string;
  user_id: number;
  username: string;
}

interface myReviews {
  address: string;
  full_name: string;
  name: string;
  review: string;
  username: string;
}

function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { myFriends, myFollowers } = useSelector((state: RootState) => state.myFriends);
  const newsfeed: NewsfeedItem[] = useSelector((state: RootState) => state.newsfeed.newsfeed);
  const myReviews: myReviews[] = useSelector((state: RootState) => state.newsfeed.myReviews);
  // console.log(newsfeed);
  // console.log(myReviews);

  useEffect(() => {
    dispatch(getMyFriends() as any);
    dispatch(getMyFollowers() as any);
    dispatch(getMyReviews() as any);
    dispatch(getNewsfeed() as any);
  }, [user, dispatch]);

  const formatDate = (inputDate: string) => {
    const dateObject = new Date(inputDate);
    const month = monthNames[dateObject.getMonth()];
    const day = String(dateObject.getDate()).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fullName = user ? user.fullName : 'John Smith';
  const joinedDate = user ? formatDate(user.joined) : 'N/A';

  const parseAddress = (address: string) => {
    const parts = address.split(',');
    const cityState = parts.slice(1, 3).join(',');
    return cityState;
  };
  const generateInitials = (fullName: string) => {
    let initials = '';
    let words = fullName.split(' ');
    for (const word of words) {
      if (word.length > 0) {
        initials += word[0].toUpperCase();
      }
    }
    return initials;
  };
  const name = generateInitials(fullName);
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-80">
          <main className="mr-64 p-20 pt-10 border-r-[1.5px] h-full right-0">
            <div className="p-5 mb-4 border-b-[1.5px] bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex items-center">
              <div className="w-[200px]">
                <div className="rounded-full w-28 h-28 m-auto bg-blue-500 text-white flex items-center justify-center text-4xl">{name}</div>
                <h3 className="font-bold text-xl mt-2 text-center">{fullName}</h3>
                <p className="text-center text-sm text-gray-900">Joined {joinedDate}</p>
              </div>
              <div className="mb-14 w-[275px]">
                <div className="grid grid-cols-3 gap-5">
                  <div className="text-center">
                    <p>{myReviews.length}</p>
                    <p>Recs</p>
                  </div>
                  <div className="text-center ">
                    <p>{myFollowers.length}</p>
                    <p>Followers</p>
                  </div>
                  <div className="text-center ">
                    <p>{myFriends.length}</p>
                    <p>Following</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-12">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">My Activity</p>
              <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                {myReviews.map((item, index) => {
                  const parsedAddress = parseAddress(item.address);
                  return (
                    <li key={index}>
                      <div className="items-center block mt-8 sm:flex">
                        <div className="text-gray-600 dark:text-gray-400">
                          <div className="text-base font-normal">
                            <span className="font-medium text-gray-900 dark:text-white">{item.full_name}</span> recommended{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                          </div>
                          <div className="text-sm font-normal">"{item.review}"</div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">9/1/2023 &middot; {parsedAddress}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Profile;
