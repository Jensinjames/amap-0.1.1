import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Share2,
  Trash2,
  Edit3,
  Calendar,
  Zap
} from 'lucide-react';
import { useContentStore } from '../store/contentStore';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { ExportMenu } from '../components/Content/ExportMenu';
import toast from 'react-hot-toast';

const contentTypeColors: Record<string, string> = {
  email: 'bg-blue-100 text-blue-800',
  social_post: 'bg-green-100 text-green-800',
  landing_page: 'bg-purple-100 text-purple-800',
  ad_copy: 'bg-red-100 text-red-800',
  strategy: 'bg-yellow-100 text-yellow-800',
  funnel: 'bg-indigo-100 text-indigo-800',
};

export const Content: React.FC = () => {
  const { user } = useAuthStore();
  const { contents, setContents, setLoading, loading } = useContentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showActions, setShowActions] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [user]);

  const fetchContent = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching content:', error);
        return;
      }

      setContents(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = contents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || content.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleShare = (content: any) => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: JSON.stringify(content.content),
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(JSON.stringify(content.content));
      toast.success('Content copied to clipboard');
    }
  };

  const handleDelete = async (contentId: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      const { error } = await supabase
        .from('generated_content')
        .delete()
        .eq('id', contentId);

      if (error) {
        toast.error('Error deleting content');
        return;
      }

      setContents(contents.filter(c => c.id !== contentId));
      toast.success('Content deleted successfully');
    } catch (error) {
      toast.error('Error deleting content');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h1>
        <p className="text-gray-600">
          Manage all your AI-generated marketing content in one place.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white"
            >
              <option value="all">All Types</option>
              <option value="email">Email Campaigns</option>
              <option value="social_post">Social Posts</option>
              <option value="landing_page">Landing Pages</option>
              <option value="ad_copy">Ad Copy</option>
              <option value="strategy">Strategy</option>
              <option value="funnel">Funnels</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {filteredContent.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterType !== 'all' ? 'No matching content found' : 'No content yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search terms or filters.'
              : 'Get started by generating your first piece of content.'
            }
          </p>
          {!searchTerm && filterType === 'all' && (
            <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              Generate Content
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((content) => (
            <div key={content.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              {/* Content Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    contentTypeColors[content.type] || 'bg-gray-100 text-gray-800'
                  }`}>
                    {content.type.replace('_', ' ')}
                  </span>
                  <h3 className="font-semibold text-gray-900 mt-2 line-clamp-2">
                    {content.title}
                  </h3>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowActions(showActions === content.id ? null : content.id)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                  
                  {showActions === content.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowExportMenu(content.id);
                            setShowActions(null);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </button>
                        <button
                          onClick={() => {
                            handleShare(content);
                            setShowActions(null);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(content.id);
                            setShowActions(null);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Export Menu */}
                  {showExportMenu === content.id && (
                    <ExportMenu
                      content={content.content}
                      title={content.title}
                      onClose={() => setShowExportMenu(null)}
                    />
                  )}
                </div>
              </div>

              {/* Content Preview */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 line-clamp-3">
                  {typeof content.content === 'object' 
                    ? JSON.stringify(content.content).substring(0, 150) + '...'
                    : content.content.substring(0, 150) + '...'
                  }
                </div>
              </div>

              {/* Content Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(content.created_at)}
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  {content.credits_cost || 1} credits
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};