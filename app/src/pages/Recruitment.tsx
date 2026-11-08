import { HtmlView } from '../components/HtmlView'
import { RecruitmentPipeline } from './RecruitmentPipeline'
import { useRoute } from '../lib/route'
import openings from './ref/recruitment/openings.html'
export function Recruitment() {
  const { sub } = useRoute()
  if (sub === 'pipeline') return <RecruitmentPipeline />
  return <HtmlView html={openings} cacheKey="Recruitment:openings" />
}
