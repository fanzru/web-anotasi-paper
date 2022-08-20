export type Profile = {
  id: number;
  name: string;
  email: string;
  exp: number;
  list_papers: [];
};

export type PaperProfile = {
  id: number;
  user_id: number;
  paper_name: string;
  article_info: string;
  domain_info: string;
  link_pdf: string;
  is_done: boolean;
};
