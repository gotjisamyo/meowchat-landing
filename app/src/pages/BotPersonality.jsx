import PageLayout from '../components/PageLayout';
import PersonalityEditor from '../components/PersonalityEditor';

export default function BotPersonality({ setSidebarOpen }) {
  return (
    <PageLayout
      title="บุคลิกของบอท"
      subtitle="ตั้งค่าตัวตนและสไตล์การพูดของผู้ช่วย AI"
      setSidebarOpen={setSidebarOpen}
    >
      <PersonalityEditor />
    </PageLayout>
  );
}
