import { Users, Heart, MessageCircle, Share2, MapPin, Calendar, Image, Camera, Globe, ThumbsUp, Bookmark, MoreHorizontal, Search } from 'lucide-react';
import { useState } from 'react';

const Feed = () => {
  const [activeTab, setActiveTab] = useState('following');
  
  const posts = [
    {
      id: 1,
      user: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
        handle: '@alexmorgan'
      },
      location: 'Santorini, Greece',
      date: '2 days ago',
      content: 'Found this incredible hidden beach in Santorini! The water was crystal clear and the views were absolutely breathtaking. Definitely worth the trek down the cliff path.',
      images: [
        'https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=1834&auto=format&fit=crop'
      ],
      likes: 342,
      comments: 56,
      saved: false
    },
    {
      id: 2,
      user: {
        name: 'Sophia Lee',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
        handle: '@sophialee'
      },
      location: 'Kyoto, Japan',
      date: '5 days ago',
      content: 'Wandering through the bamboo forests of Arashiyama was like stepping into another world. The sound of the wind through the bamboo was so peaceful. Pro tip: arrive early to avoid the crowds! #JapanTravel #Kyoto',
      images: [
        'https://images.unsplash.com/photo-1457449205106-d0aad138e99b?q=80&w=2070&auto=format&fit=crop'
      ],
      likes: 527,
      comments: 89,
      saved: true
    },
    {
      id: 3,
      user: {
        name: 'Marcus Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
        handle: '@marcuschen'
      },
      location: 'Marrakech, Morocco',
      date: '1 week ago',
      content: 'Lost in the maze of Marrakech\'s medina! Every corner reveals a new treasure - spices, textiles, and incredible craftsmanship. The sensory experience is unlike anywhere else I\'ve been.',
      images: [
        'https://images.unsplash.com/photo-1489493887464-892be6d1daae?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596627116790-af6f096e71c4?q=80&w=1974&auto=format&fit=crop'
      ],
      likes: 412,
      comments: 73,
      saved: false
    }
  ];
  
  const travelStories = [
    {
      id: 1,
      user: {
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
      },
      title: 'Solo Backpacking Europe',
      image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1770&auto=format&fit=crop',
      viewed: false
    },
    {
      id: 2,
      user: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop'
      },
      title: 'Road Trip: Pacific Coast',
      image: 'https://images.unsplash.com/photo-1540820658620-e933c0ec78aa?q=80&w=1732&auto=format&fit=crop',
      viewed: true
    },
    {
      id: 3,
      user: {
        name: 'Olivia Kim',
        avatar: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=1964&auto=format&fit=crop'
      },
      title: 'Thai Cooking Adventure',
      image: 'https://images.unsplash.com/photo-1569050939896-31da5036e961?q=80&w=1964&auto=format&fit=crop',
      viewed: false
    },
    {
      id: 4,
      user: {
        name: 'Daniel Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop'
      },
      title: 'Amazon Rainforest Trek',
      image: 'https://images.unsplash.com/photo-1542567455-cd733f23fbb1?q=80&w=1470&auto=format&fit=crop',
      viewed: false
    }
  ];
  
  const suggestedUsers = [
    {
      id: 1,
      name: 'Mia Johnson',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
      bio: 'Adventure seeker | 35 countries',
      mutual: 3
    },
    {
      id: 2,
      name: 'Tom Parker',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop',
      bio: 'Travel photographer | Foodie',
      mutual: 5
    },
    {
      id: 3,
      name: 'Ava Williams',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop',
      bio: 'Luxury travel expert | Hotel reviews',
      mutual: 2
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main feed */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                  Triponic Travel Feed
                </h1>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Search className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="flex border-b mb-6">
                <button 
                  className={`py-3 px-4 font-medium text-sm ${activeTab === 'following' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('following')}
                >
                  Following
                </button>
                <button 
                  className={`py-3 px-4 font-medium text-sm ${activeTab === 'discover' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('discover')}
                >
                  Discover
                </button>
                <button 
                  className={`py-3 px-4 font-medium text-sm ${activeTab === 'trending' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('trending')}
                >
                  Trending
                </button>
              </div>
              
              {/* Create post */}
              <div className="border border-gray-200 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <input 
                    type="text" 
                    placeholder="Share your travel experiences..." 
                    className="flex-grow bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                  />
                </div>
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-1">
                    <button className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-600">
                      <Image className="w-4 h-4" />
                      <span>Photo</span>
                    </button>
                    <button className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </button>
                    <button className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>Trip</span>
                    </button>
                  </div>
                  <button className="bg-primary text-white text-sm px-4 py-2 rounded-lg font-medium">
                    Post
                  </button>
                </div>
              </div>
              
              {/* Stories */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Travel Stories</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-primary flex items-center justify-center bg-primary/5">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs mt-1 block">Add Story</span>
                  </div>
                  
                  {travelStories.map(story => (
                    <div key={story.id} className="flex-shrink-0 w-20 text-center">
                      <div className={`w-16 h-16 mx-auto rounded-full relative ${story.viewed ? 'border-2 border-gray-300' : 'border-2 border-primary'} p-[2px]`}>
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                          <img 
                            src={story.user.avatar} 
                            alt={story.user.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <span className="text-xs mt-1 block truncate">{story.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Posts */}
              <div className="space-y-6">
                {posts.map(post => (
                  <div key={post.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                    {/* Post header */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.user.avatar} 
                          alt={post.user.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{post.user.name}</h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{post.user.handle}</span>
                            <span className="mx-1">•</span>
                            <MapPin className="w-3 h-3 inline mr-1" />
                            <span>{post.location}</span>
                            <span className="mx-1">•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-500">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Post content */}
                    <div className="px-4 pb-3">
                      <p className="mb-4">{post.content}</p>
                    </div>
                    
                    {/* Post images */}
                    <div className={`grid ${post.images.length > 1 ? 'grid-cols-2 gap-1' : 'grid-cols-1'} mb-2`}>
                      {post.images.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`Post image ${index + 1}`} 
                          className="w-full h-60 object-cover"
                        />
                      ))}
                    </div>
                    
                    {/* Post actions */}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                            <Heart className={`w-5 h-5 ${post.saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                        <button className="text-gray-500 hover:text-primary">
                          <Bookmark className={`w-5 h-5 ${post.saved ? 'fill-primary text-primary' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <button className="bg-white text-primary font-medium py-2 px-6 rounded-full border border-primary hover:bg-primary/5 transition">
                  Load More
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/3">
            {/* Profile summary */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                <div>
                  <h3 className="font-bold">Your Profile</h3>
                  <p className="text-sm text-gray-500">Complete your travel profile</p>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-center">
                <div>
                  <div className="font-bold">12</div>
                  <div className="text-xs text-gray-500">Trips</div>
                </div>
                <div>
                  <div className="font-bold">248</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
                <div>
                  <div className="font-bold">183</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
              </div>
            </div>
            
            {/* Suggested users */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <h3 className="font-bold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Travelers to Follow
              </h3>
              <div className="space-y-4">
                {suggestedUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{user.name}</h4>
                        <p className="text-xs text-gray-500">{user.bio}</p>
                      </div>
                    </div>
                    <button className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium hover:bg-primary/20 transition">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
              <button className="text-primary text-sm font-medium mt-4 hover:underline">
                View More
              </button>
            </div>
            
            {/* Coming soon */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-5">
              <h3 className="font-bold mb-3">Social Features Coming Soon!</h3>
              <p className="text-sm mb-4">
                We're building more social features to connect travelers worldwide. 
                Share tips, find travel buddies, and join community discussions.
              </p>
              <button className="bg-white text-indigo-700 text-sm px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;