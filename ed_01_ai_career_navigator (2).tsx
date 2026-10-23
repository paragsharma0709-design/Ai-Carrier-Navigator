import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  User, 
  BarChart2, 
  Map, 
  CheckSquare, 
  Award, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  ExternalLink, 
  Layers, 
  TrendingUp, 
  Briefcase, 
  Zap, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Code, 
  Brain, 
  Terminal, 
  RefreshCw,
  FolderGit2
} from 'lucide-react';

// Preset Learner Profiles for Demo
const PRESET_PROFILES = [
  {
    id: 'learner-1',
    name: 'Alex Rivera',
    title: 'Junior Web Developer',
    targetRole: 'AI Systems Engineer',
    weeklyHours: 15,
    experience: '2 years as Frontend Web Developer (React, JavaScript, Basic Node.js)',
    interests: ['LLM Deployment', 'API Integration', 'Vector Databases', 'Model Optimization'],
    skills: [
      { name: 'JavaScript / React', level: 85, category: 'Software Dev' },
      { name: 'Python Basics', level: 50, category: 'Programming' },
      { name: 'REST APIs', level: 75, category: 'Backend' },
      { name: 'Git & DevOps Basics', level: 60, category: 'DevOps' },
      { name: 'PyTorch / Machine Learning', level: 20, category: 'AI Core' },
      { name: 'Vector DBs & RAG', level: 25, category: 'AI Architecture' },
      { name: 'Model Deployment (Docker/K8s)', level: 30, category: 'DevOps' },
      { name: 'Math & Linear Algebra', level: 40, category: 'Foundations' }
    ]
  },
  {
    id: 'learner-2',
    name: 'Samantha Chen',
    title: 'Data Analyst',
    targetRole: 'Machine Learning Engineer',
    weeklyHours: 10,
    experience: '3 years in Data Analytics (SQL, Tableau, Python, Pandas, Stats)',
    interests: ['Predictive Modeling', 'MLOps', 'Feature Engineering', 'Deep Learning'],
    skills: [
      { name: 'Python / Data Analysis', level: 85, category: 'Programming' },
      { name: 'SQL & Database Querying', level: 90, category: 'Data' },
      { name: 'Statistics & Probability', level: 75, category: 'Foundations' },
      { name: 'Scikit-Learn / ML Algorithms', level: 55, category: 'AI Core' },
      { name: 'Software Architecture & OOP', level: 35, category: 'Software Dev' },
      { name: 'Deep Learning (TensorFlow/PyTorch)', level: 30, category: 'AI Core' },
      { name: 'MLOps & CI/CD Pipelines', level: 20, category: 'DevOps' },
      { name: 'Cloud Computing (AWS/GCP)', level: 40, category: 'Infrastructure' }
    ]
  }
];

// Target Role Framework Benchmarks
const ROLE_FRAMEWORKS = {
  'AI Systems Engineer': {
    description: 'Builds, deploys, and optimizes large-scale AI pipelines, combining robust software engineering with modern LLM & machine learning deployment infrastructure.',
    benchmarks: [
      { name: 'JavaScript / React', target: 60, category: 'Software Dev', importance: 'Recommended' },
      { name: 'Python Basics', target: 90, category: 'Programming', importance: 'Critical' },
      { name: 'REST APIs', target: 85, category: 'Backend', importance: 'Critical' },
      { name: 'Git & DevOps Basics', target: 80, category: 'DevOps', importance: 'Critical' },
      { name: 'PyTorch / Machine Learning', target: 80, category: 'AI Core', importance: 'Critical' },
      { name: 'Vector DBs & RAG', target: 85, category: 'AI Architecture', importance: 'Critical' },
      { name: 'Model Deployment (Docker/K8s)', target: 85, category: 'DevOps', importance: 'Critical' },
      { name: 'Math & Linear Algebra', target: 70, category: 'Foundations', importance: 'Recommended' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Stage 1: AI & Python Engineering Foundations',
        durationWeeks: 4,
        description: 'Solidify idiomatic Python, asymptotic analysis, and core linear algebra for Machine Learning.',
        tasks: [
          { id: 't1_1', title: 'Master Python AsyncIO, Decorators, and Pydantic Data Models', estHours: 12, completed: true },
          { id: 't1_2', title: 'Complete Linear Algebra & Matrix Operation Fundamentals', estHours: 10, completed: true },
          { id: 't1_3', title: 'Build a CLI-based Linear Algebra Solver using NumPy', estHours: 14, completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Stage 2: Core Deep Learning & LLM Integration',
        durationWeeks: 6,
        description: 'Understand Neural Network mechanics, Hugging Face Transformers, and Vector Indexing.',
        tasks: [
          { id: 't2_1', title: 'Implement Neural Nets from Scratch in PyTorch', estHours: 20, completed: false },
          { id: 't2_2', title: 'Build RAG Pipeline with ChromaDB & LangChain/LlamaIndex', estHours: 18, completed: false },
          { id: 't2_3', title: 'Fine-tune a quantized Llama-3 model using LoRA/PEFT', estHours: 22, completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Stage 3: MLOps, Containerization & Production Microservices',
        durationWeeks: 5,
        description: 'Deploy resilient AI inference endpoints with latency optimization and monitoring.',
        tasks: [
          { id: 't3_1', title: 'Containerize PyTorch API Endpoint using Docker & FastAPI', estHours: 15, completed: false },
          { id: 't3_2', title: 'Setup Async Task Queues with Redis & Celery for Inference', estHours: 18, completed: false },
          { id: 't3_3', title: 'Implement Latency & Token Usage Monitoring via Prometheus', estHours: 12, completed: false }
        ]
      },
      {
        stageNumber: 4,
        title: 'Stage 4: Capstone & Employability Portfolio Evidence',
        durationWeeks: 5,
        description: 'Publish production-ready open-source system and demonstrate end-to-end architecture.',
        tasks: [
          { id: 't4_1', title: 'Deploy Scalable RAG Knowledge Base microservice to AWS/GCP', estHours: 25, completed: false },
          { id: 't4_2', title: 'Write Technical Design Doc (RFC) and Benchmarking Report', estHours: 10, completed: false },
          { id: 't4_3', title: 'Record 5-minute System Walkthrough Demo Video for GitHub README', estHours: 8, completed: false }
        ]
      }
    ]
  },
  'Machine Learning Engineer': {
    description: 'Designs predictive models, engineers data pipelines, handles production feature stores, and scales training workflows.',
    benchmarks: [
      { name: 'Python / Data Analysis', target: 90, category: 'Programming', importance: 'Critical' },
      { name: 'SQL & Database Querying', target: 85, category: 'Data', importance: 'Critical' },
      { name: 'Statistics & Probability', target: 85, category: 'Foundations', importance: 'Critical' },
      { name: 'Scikit-Learn / ML Algorithms', target: 85, category: 'AI Core', importance: 'Critical' },
      { name: 'Software Architecture & OOP', target: 75, category: 'Software Dev', importance: 'Critical' },
      { name: 'Deep Learning (TensorFlow/PyTorch)', target: 80, category: 'AI Core', importance: 'Critical' },
      { name: 'MLOps & CI/CD Pipelines', target: 80, category: 'DevOps', importance: 'Recommended' },
      { name: 'Cloud Computing (AWS/GCP)', target: 70, category: 'Infrastructure', importance: 'Recommended' }
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Stage 1: Production Software Engineering for Data Scientists',
        durationWeeks: 4,
        description: 'Transition from Jupyter Notebooks to Modular OOP Python, testing, and Git workflows.',
        tasks: [
          { id: 'm1_1', title: 'Refactor ML Code into Clean Modular Python Packages with Pytest', estHours: 14, completed: true },
          { id: 'm1_2', title: 'Master Object-Oriented Design Patterns for Data Transformers', estHours: 12, completed: false },
          { id: 'm1_3', title: 'Implement Automated Unit Testing for Data Ingestion Pipelines', estHours: 10, completed: false }
        ]
      },
      {
        stageNumber: 2,
        title: 'Stage 2: Advanced Supervised & Unsupervised ML Pipelines',
        durationWeeks: 5,
        description: 'Feature engineering, hyperparameter tuning, cross-validation, and drift analysis.',
        tasks: [
          { id: 'm2_1', title: 'Build XGBoost & LightGBM Pipeline for Imbalanced Data', estHours: 16, completed: false },
          { id: 'm2_2', title: 'Implement SHAP & LIME Interpretability Dashboards', estHours: 14, completed: false },
          { id: 'm2_3', title: 'Setup Automated Data & Concept Drift Monitoring with Evidently AI', estHours: 15, completed: false }
        ]
      },
      {
        stageNumber: 3,
        title: 'Stage 3: Deep Learning Architectures & PyTorch Mastery',
        durationWeeks: 5,
        description: 'Custom neural layers, loss functions, learning rate schedulers, and distributed training.',
        tasks: [
          { id: 'm3_1', title: 'Train Convolutional & Recurrent Architectures from scratch', estHours: 20, completed: false },
          { id: 'm3_2', title: 'Implement Transfer Learning for Vision/NLP Classification Tasks', estHours: 18, completed: false }
        ]
      },
      {
        stageNumber: 4,
        title: 'Stage 4: MLOps Pipelines & Capstone Portfolio',
        durationWeeks: 4,
        description: 'MLflow tracking, DVC data versioning, automated model retraining triggers.',
        tasks: [
          { id: 'm4_1', title: 'Build MLflow + DVC Automated Retraining Pipeline on GitHub Actions', estHours: 22, completed: false },
          { id: 'm4_2', title: 'Publish Interactive Streamlit Model Evaluation Portal', estHours: 12, completed: false }
        ]
      }
    ]
  }
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Profile State initialized with Learner 1
  const [activePresetId, setActivePresetId] = useState('learner-1');
  const [learner, setLearner] = useState(PRESET_PROFILES[0]);
  
  // Dynamic Roadmap State (allows toggling completion)
  const [roadmapStages, setRoadmapStages] = useState(ROLE_FRAMEWORKS['AI Systems Engineer'].stages);

  // Evidence Logging State
  const [evidenceList, setEvidenceList] = useState([
    {
      id: 'e1',
      title: 'Python Async & Pydantic Data Validation Suite',
      type: 'GitHub Repository',
      url: 'https://github.com/example/python-async-pydantic',
      date: '2026-10-15',
      linkedTask: 'Master Python AsyncIO, Decorators, and Pydantic Data Models'
    },
    {
      id: 'e2',
      title: 'NumPy Linear Algebra Matrix Solver Notebook',
      type: 'Colab Notebook',
      url: 'https://colab.research.google.com/drive/example',
      date: '2026-10-19',
      linkedTask: 'Complete Linear Algebra & Matrix Operation Fundamentals'
    }
  ]);
  const [newEvidence, setNewEvidence] = useState({ title: '', type: 'GitHub Repository', url: '', linkedTask: '' });

  // Handle Switching Learner Profiles
  const handleProfileSwitch = (profileId) => {
    const selected = PRESET_PROFILES.find(p => p.id === profileId);
    if (selected) {
      setActivePresetId(profileId);
      setLearner(selected);
      // Update target role roadmap framework
      const targetFramework = ROLE_FRAMEWORKS[selected.targetRole] || ROLE_FRAMEWORKS['AI Systems Engineer'];
      setRoadmapStages(targetFramework.stages);
    }
  };

  // Sync roadmap when learner changes target role manually
  const handleTargetRoleChange = (roleName) => {
    setLearner(prev => ({ ...prev, targetRole: roleName }));
    if (ROLE_FRAMEWORKS[roleName]) {
      setRoadmapStages(ROLE_FRAMEWORKS[roleName].stages);
    }
  };

  // Handle skill score edits
  const handleSkillChange = (index, newLevel) => {
    const updatedSkills = [...learner.skills];
    updatedSkills[index].level = Math.min(100, Math.max(0, Number(newLevel)));
    setLearner({ ...learner, skills: updatedSkills });
  };

  // Skill Add/Delete
  const handleAddSkill = () => {
    setLearner(prev => ({
      ...prev,
      skills: [...prev.skills, { name: 'New Competency', level: 40, category: 'General' }]
    }));
  };

  const handleDeleteSkill = (index) => {
    setLearner(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Toggle Task Completion
  const toggleTask = (stageIdx, taskIdx) => {
    const updated = [...roadmapStages];
    updated[stageIdx].tasks[taskIdx].completed = !updated[stageIdx].tasks[taskIdx].completed;
    setRoadmapStages(updated);
  };

  // Calculate Gap Analysis Metrics
  const gapAnalysis = useMemo(() => {
    const currentFramework = ROLE_FRAMEWORKS[learner.targetRole] || ROLE_FRAMEWORKS['AI Systems Engineer'];
    
    return currentFramework.benchmarks.map(benchmark => {
      const existingSkill = learner.skills.find(s => s.name.toLowerCase() === benchmark.name.toLowerCase()) || { level: 0 };
      const currentLevel = existingSkill.level;
      const gap = Math.max(0, benchmark.target - currentLevel);
      
      let priority = 'Low';
      if (benchmark.importance === 'Critical' && gap >= 30) priority = 'Critical';
      else if (gap > 20) priority = 'High';
      else if (gap > 0) priority = 'Medium';
      
      return {
        ...benchmark,
        currentLevel,
        gap,
        priority
      };
    });
  }, [learner.skills, learner.targetRole]);

  // Total Learning Stats Calculation
  const stats = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    let totalHours = 0;
    let completedHours = 0;

    roadmapStages.forEach(stage => {
      stage.tasks.forEach(task => {
        totalTasks++;
        totalHours += task.estHours;
        if (task.completed) {
          completedTasks++;
          completedHours += task.estHours;
        }
      });
    });

    const percentComplete = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const remainingHours = totalHours - completedHours;
    const estimatedWeeksRemaining = learner.weeklyHours > 0 ? Math.ceil(remainingHours / learner.weeklyHours) : 0;

    return {
      totalTasks,
      completedTasks,
      totalHours,
      completedHours,
      percentComplete,
      remainingHours,
      estimatedWeeksRemaining
    };
  }, [roadmapStages, learner.weeklyHours]);

  // Evidence submission handler
  const handleAddEvidence = (e) => {
    e.preventDefault();
    if (!newEvidence.title || !newEvidence.url) return;
    setEvidenceList(prev => [
      ...prev,
      {
        id: `e-${Date.now()}`,
        ...newEvidence,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewEvidence({ title: '', type: 'GitHub Repository', url: '', linkedTask: '' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col selection:bg-teal-500 selection:text-slate-900">
      
      {/* GLOBAL SAFEGUARD HEADER DISCLAIMER BANNER */}
      <div className="bg-gradient-to-r from-amber-900/40 via-amber-800/30 to-amber-900/40 border-b border-amber-500/30 px-4 py-2 text-xs sm:text-sm text-amber-200/90 flex items-center justify-center gap-2 text-center">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>Safeguard Notice:</strong> AI assessments provide directional skill mapping and personalized study recommendations. They do not guarantee employment or constitute objective evaluations of personal worth.
        </span>
      </div>

      {/* TOP NAV BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  ED-01
                </span>
                <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  AI Career Navigator
                </span>
              </div>
            </div>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Layers },
                { id: 'profile', label: 'Profile & Goals', icon: User },
                { id: 'comparison', label: 'Role Gap Analysis', icon: BarChart2 },
                { id: 'roadmap', label: 'Dynamic Roadmap', icon: Map },
                { id: 'progress', label: 'Tracker & Evidence', icon: CheckSquare }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-indigo-600/30 text-teal-300 border border-indigo-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Learner Switcher Badge */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-slate-800 border border-slate-700/80 rounded-lg p-1">
                <span className="text-xs text-slate-400 px-2 font-medium hidden lg:inline">Active Learner:</span>
                <select
                  value={activePresetId}
                  onChange={(e) => handleProfileSwitch(e.target.value)}
                  className="bg-slate-900 text-xs font-semibold text-teal-300 rounded px-2 py-1 border border-slate-700 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  {PRESET_PROFILES.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.title} → {p.targetRole})
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex overflow-x-auto border-t border-slate-800/80 px-2 py-2 gap-1 no-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Layers },
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'comparison', label: 'Gap Analysis', icon: BarChart2 },
            { id: 'roadmap', label: 'Roadmap', icon: Map },
            { id: 'progress', label: 'Evidence', icon: CheckSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* VIEW 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 sm:p-8">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" /> Customized Learning Navigator
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Welcome back, {learner.name}
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                    Transitioning from <span className="text-indigo-300 font-semibold">{learner.title}</span> to{' '}
                    <span className="text-teal-300 font-semibold">{learner.targetRole}</span>.
                    You are currently allocating <span className="text-white font-medium">{learner.weeklyHours} hrs/week</span>.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button 
                    onClick={() => setActiveTab('roadmap')}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/20"
                  >
                    <span>View Roadmap</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('comparison')}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
                  >
                    <span>Gap Benchmark</span>
                    <BarChart2 className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Progress</p>
                  <p className="text-2xl font-bold text-white mt-1">{stats.percentComplete}%</p>
                  <p className="text-xs text-slate-400 mt-1">{stats.completedTasks} of {stats.totalTasks} Tasks Done</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Timeline</p>
                  <p className="text-2xl font-bold text-teal-300 mt-1">~{stats.estimatedWeeksRemaining} Weeks</p>
                  <p className="text-xs text-slate-400 mt-1">At {learner.weeklyHours} hours per week</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Skill Gaps</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">
                    {gapAnalysis.filter(g => g.priority === 'Critical').length} Requirements
                  </p>
                  <p className="text-xs text-slate-400 mt-1">High priority focus areas</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Logged Evidence</p>
                  <p className="text-2xl font-bold text-indigo-300 mt-1">{evidenceList.length} Items</p>
                  <p className="text-xs text-slate-400 mt-1">Artifacts & Github projects</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Dashboard 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Top Priority Skill Gaps Preview */}
              <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/80 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" /> Key Priority Skill Gaps
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Top benchmark deficiencies for {learner.targetRole}</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('comparison')}
                    className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1"
                  >
                    Full Analysis <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {gapAnalysis.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                          <span className="ml-2 text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {item.category}
                          </span>
                        </div>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                          item.priority === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          item.priority === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Current: <strong className="text-white">{item.currentLevel}%</strong></span>
                        <span>Target Benchmark: <strong className="text-teal-400">{item.target}%</strong></span>
                      </div>

                      {/* Progress bar visual */}
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden relative">
                        {/* Target line indicator */}
                        <div 
                          className="absolute top-0 bottom-0 w-1 bg-teal-400 z-10" 
                          style={{ left: `${item.target}%` }}
                          title={`Target Goal: ${item.target}%`}
                        />
                        <div 
                          className={`h-full transition-all duration-500 ${
                            item.gap > 30 ? 'bg-gradient-to-r from-indigo-500 to-amber-500' : 'bg-gradient-to-r from-indigo-500 to-teal-400'
                          }`}
                          style={{ width: `${item.currentLevel}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Next Up Actionable Learning Tasks */}
              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-indigo-400" /> Active Stage Tasks
                  </h3>

                  <div className="space-y-3">
                    {roadmapStages[0]?.tasks.slice(0, 3).map((task, idx) => (
                      <div key={task.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-3">
                        <button 
                          onClick={() => toggleTask(0, idx)}
                          className="mt-0.5 text-slate-400 hover:text-teal-400 transition-colors"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-teal-400" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs sm:text-sm font-medium leading-snug ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {task.title}
                          </p>
                          <span className="inline-block mt-1 text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            Est. {task.estHours} hrs
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60">
                  <button 
                    onClick={() => setActiveTab('roadmap')}
                    className="w-full py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 font-semibold text-xs sm:text-sm text-center transition-all"
                  >
                    Open Complete Interactive Roadmap
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: LEARNER PROFILE & GOALS CAPTURE */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 sm:p-8">
              
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-teal-400" /> Learner Profile & Configuration
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Capture skills, background, available hours, and chosen target career path.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Preset Switcher</span>
                  <div className="flex gap-2 mt-1">
                    {PRESET_PROFILES.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleProfileSwitch(p.id)}
                        className={`px-3 py-1 text-xs rounded-lg font-medium border transition-all ${
                          activePresetId === p.id 
                            ? 'bg-teal-500/20 border-teal-500/50 text-teal-300' 
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {p.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Input Section */}
              <div className="space-y-6">
                
                {/* General Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={learner.name}
                      onChange={(e) => setLearner({ ...learner, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Current Job Title / Background
                    </label>
                    <input
                      type="text"
                      value={learner.title}
                      onChange={(e) => setLearner({ ...learner, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Target Role & Available Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Target Role
                    </label>
                    <select
                      value={learner.targetRole}
                      onChange={(e) => handleTargetRoleChange(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-teal-300 font-semibold focus:outline-none focus:border-teal-500 cursor-pointer"
                    >
                      <option value="AI Systems Engineer">AI Systems Engineer</option>
                      <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Weekly Study Hours Available ({learner.weeklyHours} hrs)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="5"
                        max="40"
                        step="1"
                        value={learner.weeklyHours}
                        onChange={(e) => setLearner({ ...learner, weeklyHours: Number(e.target.value) })}
                        className="w-full accent-teal-400 cursor-pointer"
                      />
                      <span className="text-sm font-bold text-teal-400 min-w-[3rem] text-right">
                        {learner.weeklyHours} h/wk
                      </span>
                    </div>
                  </div>
                </div>

                {/* Experience Summary */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Work & Academic Experience Summary
                  </label>
                  <textarea
                    rows={2}
                    value={learner.experience}
                    onChange={(e) => setLearner({ ...learner, experience: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Current Skills Inventory with Sliders */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Current Skill Inventory (% Self-Proficiency)
                    </label>
                    <button
                      onClick={handleAddSkill}
                      className="text-xs bg-indigo-600/40 hover:bg-indigo-600 text-indigo-200 border border-indigo-500/40 px-3 py-1 rounded-lg flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Skill
                    </button>
                  </div>

                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {learner.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const updated = [...learner.skills];
                              updated[index].name = e.target.value;
                              setLearner({ ...learner, skills: updated });
                            }}
                            className="bg-transparent text-sm font-medium text-white border-b border-transparent focus:border-teal-500 focus:outline-none w-full"
                          />
                        </div>
                        
                        <div className="w-36 flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => handleSkillChange(index, e.target.value)}
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-teal-300 min-w-[2.5rem] text-right">
                            {skill.level}%
                          </span>
                        </div>

                        <button 
                          onClick={() => handleDeleteSkill(index)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Remove Skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: STRUCTURED ROLE COMPARISON & SKILL GAP ANALYSIS */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            
            {/* Header / Intro */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-teal-400" /> Target Role Benchmark Comparison
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Comparing <span className="text-white font-medium">{learner.name}'s</span> current skills against target industry requirements for <span className="text-teal-300 font-bold">{learner.targetRole}</span>.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
                  Curated Skill Framework Benchmarks
                </div>
              </div>
            </div>

            {/* Visual Match Matrix & Priority Matrix Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Detailed Visual Skill Comparison List */}
              <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700/80 pb-3">
                  <Brain className="w-5 h-5 text-indigo-400" /> Skill Requirement Gap Matrix
                </h3>

                <div className="space-y-4">
                  {gapAnalysis.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/70 rounded-xl p-4 border border-slate-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="font-semibold text-sm text-slate-100">{item.name}</span>
                          <span className="ml-2 text-xs text-slate-400">({item.category})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Requirement:</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                            item.importance === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {item.importance}
                          </span>
                        </div>
                      </div>

                      {/* Visual Gap Bar */}
                      <div className="relative pt-2">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Current Level: <strong className="text-white">{item.currentLevel}%</strong></span>
                          <span>Required Target: <strong className="text-teal-400">{item.target}%</strong></span>
                          <span>Gap Deficit: <strong className={item.gap > 0 ? "text-amber-400" : "text-emerald-400"}>{item.gap}%</strong></span>
                        </div>

                        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative">
                          {/* Current proficiency bar */}
                          <div 
                            className="h-full bg-indigo-500 transition-all duration-300"
                            style={{ width: `${item.currentLevel}%` }}
                          />
                          {/* Unfilled Gap section */}
                          {item.gap > 0 && (
                            <div 
                              className="h-full bg-amber-500/30 absolute top-0"
                              style={{ 
                                left: `${item.currentLevel}%`, 
                                width: `${Math.min(item.gap, 100 - item.currentLevel)}%` 
                              }}
                            />
                          )}
                          {/* Target marker line */}
                          <div 
                            className="absolute top-0 bottom-0 w-1 bg-teal-400 z-10" 
                            style={{ left: `${item.target}%` }} 
                            title={`Target Requirement: ${item.target}%`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Breakdown Box */}
              <div className="space-y-6">
                
                <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" /> Actionable Gap Priorities
                  </h3>

                  <div className="space-y-3">
                    <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl">
                      <div className="flex items-center justify-between text-red-300 font-bold text-xs uppercase tracking-wider mb-1">
                        <span>Critical Deficits</span>
                        <span>{gapAnalysis.filter(g => g.priority === 'Critical').length} Items</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Essential prerequisites for initial screening in {learner.targetRole} positions.
                      </p>
                    </div>

                    <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl">
                      <div className="flex items-center justify-between text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
                        <span>High / Medium Priority</span>
                        <span>{gapAnalysis.filter(g => g.priority === 'High' || g.priority === 'Medium').length} Items</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Core domain knowledge needed to perform tasks efficiently on the job.
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                      <div className="flex items-center justify-between text-emerald-300 font-bold text-xs uppercase tracking-wider mb-1">
                        <span>Aligned / Low Gap</span>
                        <span>{gapAnalysis.filter(g => g.gap === 0).length} Items</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Existing skill areas that meet or exceed benchmark standards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Box */}
                <div className="bg-gradient-to-br from-indigo-900/50 to-slate-800 border border-indigo-500/30 rounded-2xl p-6 text-center">
                  <p className="text-xs text-indigo-300 uppercase font-bold tracking-wider mb-2">Automated Roadmap Generation</p>
                  <h4 className="text-sm font-bold text-white mb-2">Ready to bridge these skill gaps?</h4>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    Our navigator has mapped these gaps directly to concrete study modules and portfolio projects.
                  </p>
                  <button 
                    onClick={() => setActiveTab('roadmap')}
                    className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md"
                  >
                    Generate & View Staged Roadmap
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* VIEW 4: STAGED DYNAMIC LEARNING ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            
            {/* Control Bar Header */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Map className="w-5 h-5 text-teal-400" /> Staged Personalized Learning Roadmap
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Structured learning plan targeting identified skill gaps for <span className="text-teal-300 font-semibold">{learner.targetRole}</span>.
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800 shrink-0">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 block">Weekly Pace:</span>
                    <span className="font-bold text-white">{learner.weeklyHours} hours / week</span>
                  </div>
                  <div className="border-l border-slate-800 pl-4 text-xs">
                    <span className="text-slate-400 block">Total Est. Completion:</span>
                    <span className="font-bold text-teal-300">~{stats.estimatedWeeksRemaining} Weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage Timeline list */}
            <div className="space-y-6">
              {roadmapStages.map((stage, sIdx) => {
                const stageCompletedTasks = stage.tasks.filter(t => t.completed).length;
                const stagePercent = stage.tasks.length > 0 ? Math.round((stageCompletedTasks / stage.tasks.length) * 100) : 0;

                return (
                  <div key={sIdx} className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold text-sm flex items-center justify-center shrink-0">
                          {stage.stageNumber}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">{stage.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">{stage.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                          Paced for ~{Math.ceil(stage.tasks.reduce((a,b)=>a+b.estHours,0) / (learner.weeklyHours || 10))} weeks
                        </span>
                        <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20">
                          {stagePercent}% Completed
                        </span>
                      </div>
                    </div>

                    {/* Task checklist within Stage */}
                    <div className="space-y-3">
                      {stage.tasks.map((task, tIdx) => (
                        <div 
                          key={task.id}
                          className={`p-4 rounded-xl border transition-all ${
                            task.completed 
                              ? 'bg-slate-900/40 border-slate-800/60 opacity-80' 
                              : 'bg-slate-900/80 border-slate-700/60 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTask(sIdx, tIdx)}
                              className="mt-0.5 text-slate-400 hover:text-teal-400 transition-colors shrink-0"
                            >
                              {task.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-teal-400" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-500" />
                              )}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4 className={`text-sm font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                                  {task.title}
                                </h4>
                                <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded shrink-0 self-start sm:self-auto">
                                  Est. Effort: {task.estHours} hrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* VIEW 5: INTERACTIVE TRACKER & EVIDENCE LOGGING */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            
            {/* Stats Dashboard Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Completion Metrics</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white">{stats.percentComplete}%</span>
                  <span className="text-xs text-slate-400">Total Program Progress</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-teal-400" style={{ width: `${stats.percentComplete}%` }} />
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hours Dedicated</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-teal-300">{stats.completedHours} / {stats.totalHours}</span>
                  <span className="text-xs text-slate-400">Hours Logged</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Remaining effort: {stats.remainingHours} hrs ({stats.estimatedWeeksRemaining} weeks at pace)
                </p>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verified Artifacts</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-purple-400">{evidenceList.length}</span>
                  <span className="text-xs text-slate-400">Submitted Proof Points</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">GitHub repos, design docs, and notebook links</p>
              </div>

            </div>

            {/* Evidence Submission & Log List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form to Log Evidence */}
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-teal-400" /> Log Portfolio Evidence
                </h3>

                <form onSubmit={handleAddEvidence} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Artifact / Project Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Scalable RAG FastApi Service"
                      value={newEvidence.title}
                      onChange={(e) => setNewEvidence({ ...newEvidence, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Evidence Type
                    </label>
                    <select
                      value={newEvidence.type}
                      onChange={(e) => setNewEvidence({ ...newEvidence, type: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-teal-500"
                    >
                      <option value="GitHub Repository">GitHub Repository</option>
                      <option value="Colab Notebook">Colab Notebook</option>
                      <option value="Technical RFC Doc">Technical RFC Doc</option>
                      <option value="Demo Video">Demo Video</option>
                      <option value="Certification">Certification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      URL Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={newEvidence.url}
                      onChange={(e) => setNewEvidence({ ...newEvidence, url: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Linked Skill Task
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Build RAG Pipeline"
                      value={newEvidence.linkedTask}
                      onChange={(e) => setNewEvidence({ ...newEvidence, linkedTask: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all mt-2"
                  >
                    Submit Proof Artifact
                  </button>
                </form>
              </div>

              {/* Submitted Evidence List */}
              <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" /> Logged Employability Evidence
                </h3>

                {evidenceList.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No proof artifacts logged yet. Use the form to submit projects.</p>
                ) : (
                  <div className="space-y-3">
                    {evidenceList.map((item) => (
                      <div key={item.id} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-slate-100">{item.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              {item.type}
                            </span>
                          </div>
                          {item.linkedTask && (
                            <p className="text-xs text-slate-400">Linked Goal: <span className="text-slate-300">{item.linkedTask}</span></p>
                          )}
                          <span className="text-[11px] text-slate-500 block">Logged on {item.date}</span>
                        </div>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-medium shrink-0 self-start sm:self-auto bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
                        >
                          <span>Open Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 ED-01 | AI Career Navigator. Official Educational Guidance Platform.</p>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Recommendations are traceable to benchmark role requirements and provide structured skill progression. All outputs are directional guides and do not guarantee placement.
          </p>
        </div>
      </footer>

    </div>
  );
}