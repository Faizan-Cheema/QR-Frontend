'use client';

interface QRTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

function QRTypeCard({ icon, title, description, isSelected, onClick }: QRTypeCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-6 transition-all ${
        isSelected
          ? 'border-2 border-dashed shadow-md'
          : 'border-2 border-transparent hover:border-gray-200'
      }`}
      style={{
        backgroundColor: 'rgba(83, 79, 235, 0.05)',
        borderColor: isSelected ? '#534FEB' : 'transparent',
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4" style={{ color: '#534FEB' }}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

interface CreateNewQRProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function CreateNewQR({ selectedType, onTypeChange }: CreateNewQRProps) {

  const qrTypes = [
    {
      id: 'url',
      title: 'URL / Website',
      description: 'Link to any website or online content',
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      id: 'file',
      title: 'File QR',
      description: 'Share PDF, Document or Other File',
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      id: 'dynamic',
      title: 'Dynamic QR',
      description: 'Smart redirects based on conditions',
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New QR Code</h1>
        <p className="text-gray-500">Choose your QR code type and customize it for your needs.</p>
      </div>

      {/* QR Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {qrTypes.map((type) => (
          <QRTypeCard
            key={type.id}
            icon={type.icon}
            title={type.title}
            description={type.description}
            isSelected={selectedType === type.id}
            onClick={() => onTypeChange(type.id)}
          />
        ))}
      </div>
    </div>
  );
}

