import { createServerFn } from "@tanstack/react-start";
import { dbOrNull } from "./db";
import { faqEntries, normalizeFaqQuestion } from "./lists.functions";

type FaqItem={q:string;a:string;href:string};
export const getFaqDirectory=createServerFn({method:"GET"}).handler(async():Promise<FaqItem[]>=>{
  const db=dbOrNull(); if(!db) return [];
  const [{data:subs},{data:ideas}]=await Promise.all([
    db.from("subcategories").select("slug,faq").order("code").limit(1000),
    db.from("ideas").select("slug,faq").eq("status","published").order("code").limit(1000),
  ]);
  const result:FaqItem[]=[],seen=new Set<string>();
  const add=(entries:{q:string;a:string}[],href:string)=>{for(const entry of entries){const key=normalizeFaqQuestion(entry.q);if(key&&!seen.has(key)){seen.add(key);result.push({...entry,href});break;}}};
  for(const row of subs??[]) {add(faqEntries(row.faq),`/lists/${row.slug}`);if(result.length>=60) return result;}
  for(const row of ideas??[]) {add(faqEntries(row.faq),`/idea/${row.slug}`);if(result.length>=60) break;}
  return result;
});
