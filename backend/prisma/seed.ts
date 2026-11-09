import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const db=new PrismaClient();
type CatalogEntry={code:string,title:string,deptName:string};
async function main(){
 const courses=JSON.parse(readFileSync(join(process.cwd(),'prisma','catalog.json'),'utf8')) as CatalogEntry[];
 for(const course of courses){await db.course.upsert({where:{code:course.code},update:{},create:{code:course.code,title:course.title,department:course.deptName,status:'DRAFT',paymentMode:'FULL',feeMinor:0,currency:'KES'}});}
 console.log(`Imported ${courses.length} catalog entries as UNPUBLISHED DRAFTS with NO fee.`);
 console.log('Admin must set prices and publish courses explicitly. No default admin account is created.');
}
main().finally(()=>db.$disconnect());
