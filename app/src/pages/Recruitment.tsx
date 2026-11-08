import { InteractiveHtmlView } from '../components/InteractiveHtmlView'
import { RecruitmentPipeline } from './RecruitmentPipeline'
import { useRoute } from '../lib/route'
import openings from './ref/recruitment/openings.html'
export function Recruitment() {
  const { sub } = useRoute()
  if (sub === 'pipeline') return <RecruitmentPipeline />
  return <InteractiveHtmlView html={openings} cacheKey="Recruitment:openings" />
}
