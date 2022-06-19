export type Sentence = {
  sent: string;
  tag: string;
};

export type selectedSentence = {
  par_id: number
  sentences: Sentence[]
}

export type Section = {
  section_name: string;
  selected_sentences: selectedSentence[];
};

export type dataPaper = {
  paper_id: string;
  sections: Section[];
};
