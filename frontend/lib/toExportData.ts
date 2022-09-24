import { dataExport, dataPaper, Section } from '@/types/paper';

export const toExportData = (sections: Section[], valuePaper: dataPaper) => {
  const Result: dataExport[] = [];

  sections.map((section) => {
    return section.selected_sentences.map((selected) => {
      return selected.sentences.map((sentence, sentenceKey) => {
        Result.push({
          user_paper_id: valuePaper.id,
          paper_name: valuePaper.paper_name,
          section_name: section.section_name,
          par_id: selected.par_id,
          sent_id: 'sent_' + selected.par_id + '_' + sentenceKey,
          automatic_label: sentence.tag,
          manual_label: sentence.tag,
          checked: true,
          correct_label: false,
          sent: sentence.sent,
        });
      });
    });
  });

  return Result;
};
