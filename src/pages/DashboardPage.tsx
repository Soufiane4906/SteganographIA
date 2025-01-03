import React from 'react';
import { ImagePlus, Brain, Shield, Image } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import AnalysisChart from '../components/dashboard/AnalysisChart';
import { useStats } from '../hooks/useStats';

const DashboardPage = () => {
  const { stats, loading } = useStats();

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Images Analysées"
          value={stats?.totalImages || 0}
          icon={<ImagePlus className="w-8 h-8" />}
        />
        <StatsCard 
          title="Images IA Détectées"
          value={stats?.aiImages || 0}
          icon={<Brain className="w-8 h-8" />}
        />
        <StatsCard 
          title="Signatures Détectées"
          value={stats?.signedImages || 0}
          icon={<Shield className="w-8 h-8" />}
        />
        <StatsCard 
          title="Images Authentiques"
          value={stats?.authenticImages || 0}
          icon={<Image className="w-8 h-8" />}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Analyses sur 7 Jours</h2>
        <AnalysisChart data={stats?.weeklyData || []} />
      </div>
    </div>
  );
};

export default DashboardPage;