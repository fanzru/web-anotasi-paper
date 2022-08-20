export type Sentence = {
  sent: string;
  tag: string;
};

export type selectedSentence = {
  par_id: number;
  sentences: Sentence[];
};

export type Section = {
  section_name: string;
  selected_sentences: selectedSentence[];
};

export type dataPaper = {
  id: number;
  user_id: number;
  paper_name: string;
  sections: Section[];
  article_info: string;
  domain_info: string;
  link_pdf: string;
  is_done: false;
};

export type dataExport = {
  user_id?: string;
  paper_id: string;
  section_name: string;
  par_id: number;
  sent_id: string;
  automatic_label: string;
  manual_label: string;
  checked: boolean;
  sent: string;
};
