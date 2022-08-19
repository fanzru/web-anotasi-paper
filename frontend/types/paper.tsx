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
  paper_id: string;
  sections: Section[];
};

export type dataExport = {
  paper_id: string;
  section_name: string;
  par_id: number;
  sent_id: string;
  automatic_label: string;
  manual_label: string;
  checked: boolean;
  correct_section_head: boolean;
  sent: string;
};
