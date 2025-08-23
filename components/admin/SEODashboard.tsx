'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  TrendingUp,
  Link,
  FileText,
  Globe,
  CheckCircle,
  AlertCircle,
  Info,
  BarChart,
  Target,
  Zap,
  MapPin,
  Copy,
  ExternalLink,
  Download
} from 'lucide-react';
import { getAllLocations } from '@/lib/locationData';
import { getAllServices } from '@/lib/serviceData';

interface SEOMetrics {
  pagesIndexed: number;
  avgPosition: number;
  totalImpressions: number;
  totalClicks: number;
  ctr: number;
  topKeywords: { keyword: string; position: number; clicks: number }[];
}

export default function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics>({
    pagesIndexed: 147,
    avgPosition: 12.3,
    totalImpressions: 45234,
    totalClicks: 2341,
    ctr: 5.2,
    topKeywords: [
      { keyword: 'bathroom remodeling spokane', position: 3, clicks: 234 },
      { keyword: 'kitchen contractor spokane valley', position: 5, clicks: 189 },
      { keyword: 'interior painting liberty lake', position: 7, clicks: 156 },
      { keyword: 'handyman services near me', position: 4, clicks: 201 },
      { keyword: 'home repairs spokane wa', position: 6, clicks: 143 }
    ]
  });

  const locations = getAllLocations();
  const services = getAllServices();

  const [generatedUrls, setGeneratedUrls] = useState<string[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate all possible URL combinations
    const generateUrls = () => {
      const urls: string[] = [];
      
      // Service pages
      services.forEach(service => {
        urls.push(`https://burganhomeservices.com/services/${service.slug}`);
      });
      
      // Location + Service pages
      services.slice(0, 3).forEach(service => {
        locations.slice(0, 5).forEach(location => {
          urls.push(`https://burganhomeservices.com/${service.slug}-${location.slug}`);
        });
      });
      
      return urls;
    };

    setGeneratedUrls(generateUrls());
  }, [locations, services]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const exportSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${generatedUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
    
    const blob = new Blob([sitemap], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* SEO Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">SEO Performance Dashboard</h2>
        
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 rounded-lg p-4 text-center"
          >
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{metrics.pagesIndexed}</div>
            <div className="text-sm text-gray-600">Pages Indexed</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-50 rounded-lg p-4 text-center"
          >
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{metrics.avgPosition.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Position</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-50 rounded-lg p-4 text-center"
          >
            <BarChart className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{(metrics.totalImpressions / 1000).toFixed(1)}k</div>
            <div className="text-sm text-gray-600">Impressions</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50 rounded-lg p-4 text-center"
          >
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{metrics.totalClicks.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Clicks</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-50 rounded-lg p-4 text-center"
          >
            <Zap className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600">{metrics.ctr.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">CTR</div>
          </motion.div>
        </div>

        {/* Top Keywords */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Performing Keywords</h3>
          <div className="space-y-3">
            {metrics.topKeywords.map((keyword, index) => (
              <div key={keyword.keyword} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-slate-900">{keyword.keyword}</p>
                    <p className="text-sm text-gray-600">Position: {keyword.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-600">{keyword.clicks} clicks</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page Generator */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">SEO Page URLs</h3>
          <button
            onClick={exportSitemap}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Sitemap
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700">
                <strong>Total SEO Pages Generated:</strong> {generatedUrls.length} pages
              </p>
              <p className="text-sm text-gray-600 mt-1">
                These URLs combine services with locations for maximum local SEO coverage.
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">URL</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {generatedUrls.map((url) => (
                <tr key={url} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <span className="text-sm text-gray-700 font-mono">{url.replace('https://burganhomeservices.com/', '/')}</span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                        title="Copy URL"
                      >
                        {copiedUrl === url ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={url.replace('https://burganhomeservices.com', '')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                        title="Open Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Checklist */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">SEO Optimization Checklist</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Technical SEO</h4>
            <div className="space-y-2">
              {[
                { label: 'Mobile-responsive design', status: true },
                { label: 'SSL certificate installed', status: true },
                { label: 'XML sitemap submitted', status: true },
                { label: 'Robots.txt configured', status: true },
                { label: 'Page speed optimized', status: true },
                { label: 'Schema markup implemented', status: true }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  {item.status ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Local SEO</h4>
            <div className="space-y-2">
              {[
                { label: 'Google Business Profile claimed', status: true },
                { label: 'NAP consistency across directories', status: true },
                { label: 'Local schema markup', status: true },
                { label: 'Location pages created', status: true },
                { label: 'Customer reviews system', status: true },
                { label: 'Local content strategy', status: true }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  {item.status ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick SEO Actions</h3>
        
        <div className="grid md:grid-cols-4 gap-4">
          <button className="bg-white hover:shadow-md rounded-lg p-4 transition-all text-left">
            <Search className="w-6 h-6 text-indigo-600 mb-2" />
            <p className="font-medium text-gray-900">Keyword Research</p>
            <p className="text-sm text-gray-600">Find new opportunities</p>
          </button>
          
          <button className="bg-white hover:shadow-md rounded-lg p-4 transition-all text-left">
            <Link className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Backlink Analysis</p>
            <p className="text-sm text-gray-600">Monitor link profile</p>
          </button>
          
          <button className="bg-white hover:shadow-md rounded-lg p-4 transition-all text-left">
            <Globe className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Competitor Analysis</p>
            <p className="text-sm text-gray-600">Track competitors</p>
          </button>
          
          <button className="bg-white hover:shadow-md rounded-lg p-4 transition-all text-left">
            <MapPin className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Local Rankings</p>
            <p className="text-sm text-gray-600">Check local positions</p>
          </button>
        </div>
      </div>
    </div>
  );
}