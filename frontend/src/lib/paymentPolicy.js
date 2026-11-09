// Frontend-only pricing configuration: never trust browser state as a payment receipt.
export const defaultPaymentPolicy = {type:'paid',currency:'KES',fee:0,methods:['full','installments'],depositPercent:50,installmentCount:2,accessAfterDeposit:false};
export function policyFor(course) { return {...defaultPaymentPolicy, ...(course?.payment||{})}; }
export const money=(amount,currency='KES')=>new Intl.NumberFormat('en-KE',{style:'currency',currency,maximumFractionDigits:0}).format(Number(amount)||0);
export function isConfiguredPaid(policy){return policy.type==='paid'&&Number(policy.fee)>0;}
export function enrollmentLocked(course,record){const p=policyFor(course); if(p.type==='free')return false;return !record||record.status!=='active';}
