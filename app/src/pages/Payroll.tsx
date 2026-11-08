import { useRoute } from '../lib/route'
import run from './ref/payroll/run.html'
import payslips from './ref/payroll/payslips.html'
import history from './ref/payroll/history.html'
const M: Record<string, string> = { run, payslips, history }
export function Payroll() {
  const { sub } = useRoute()
  return (<div className="page" dangerouslySetInnerHTML={{ __html: M[sub] ?? run }} />)
}
