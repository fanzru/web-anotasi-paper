type Sentence = {
  sent: String;
  tag: String;
};

type selectedSentence = {
  par_id: number;
  sentences: Sentence[];
};

type Section = {
  section_name: String;
  selected_sentences: selectedSentence[];
};

type dataPaper = {
  paper_id: String;
  sections: Section[];
};

export default dataPaper;