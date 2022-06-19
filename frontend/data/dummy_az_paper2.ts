import {dataPaper} from "../types/paper";

const DataSummaryPaper: dataPaper = {
  "paper_id": "paper_identifier",
  "sections": [
      {
          "section_name": "Abstract",
          "selected_sentences": [
              {
                  "par_id": 0,
                  "sentences": [
                      {
                          "sent": "The main problem for generating an extractive automatic text summary is to detect the most relevant information in the source document.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Although, some approaches claim being domain and language independent, they use high dependence knowledge like key-phrases or golden samples for machine-learning approaches.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "In this work, we propose a language-and domain-independent automatic text summarization approach by sentence extraction using an unsupervised learning algorithm.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Our hypothesis is that an unsupervised algorithm can help for clustering similar ideas (sentences).",
                          "tag": "Method"
                      },
                      {
                          "sent": "Then, for composing the summary, the most representative sentence is selected from each cluster.",
                          "tag": "Method"
                      },
                      {
                          "sent": "Several experiments in the standard DUC-2002 collection show that the proposed method obtains more favorable results than other approaches.",
                          "tag": "Method"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Introduction",
          "selected_sentences": [
              {
                  "par_id": 2,
                  "sentences": [
                      {
                          "sent": "In the last two decades, we have experienced an exponential increase in the electronic text information available for being query.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "The best example of the hugest and everincreased collection of documents most frequently querying is Internet, with millions of web documents.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Nowadays, it is common to use Google for retrieving a list of thousands of web pages, but the user has to decide if a document is interesting only with the extracted text where the words of the request query appears.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Therefore, it is necessary download and read each document until the user finds satisfactory information.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "It was unnecessary and time-consuming routine.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Thus, it is indispensable to develop automatic methods for detecting the most relevant content from a source document in order to show it as a summary.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "In addition, there are a number of scenarios where automatic construction of such summaries is useful.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Other examples include automatic construction of summaries of news articles or email messages for sending them to mobile devices as SMS; summarization of information for government officials, businesspersons, researches, etc, and summarization of web pages to be shown on the screen of a mobile device, among many others.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "These examples show that it is desirable that text summarization approaches work more in language and dominion independent way.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Automatic Text Summarization (ATS) is an active research area that deals with single-and multi-document summarization tasks.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "In single-document summarization, the summary of only one document is built, while in multi-document summarization the summary of a whole collection of documents (such as all today's news or all search results for a query) is built.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "While we believe that our ideas apply to either case, in this work we have experimented only with single-document summaries.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 3,
                  "sentences": [
                      {
                          "sent": "Summarization methods can be classified into abstractive and extractive summarization [1].",
                          "tag": "Claim"
                      },
                      {
                          "sent": "An abstractive summary is an arbitrary text that describes the contexts of the source document.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Abstractive summarization process consists of \"understanding\" the original text and \"re-telling\" it in fewer words.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Namely, an abstractive summarization method uses linguistic methods to examine and interpret the text and then to find new concepts and expressions to best describe it by generating a new shorter text that conveys the most important information from the original document.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "While this may seem the best way to construct a summary (and this is how human beings do it), in real-life setting immaturity of the corresponding linguistic technology for text analysis and generation currently renders such methods practically infeasible.",
                          "tag": "Claim"
                      }
                  ]
              },
              {
                  "par_id": 6,
                  "sentences": [
                      {
                          "sent": "The main problem for generating an extractive automatic text summary is to detect the most relevant information in the source document.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Although, some approaches claim being domain and language independent, they use some degree of language knowledge like lexical information [2], key-phrases [3] or golden samples for supervised learning approaches [4][5][6].",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Furthermore, training on a specific domain tends to customize the extraction process to that domain, so the resulting classifier is not necessarily portable.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "In our opinion, these works present a high dominion and language dependence degree.",
                          "tag": "Claim"
                      }
                  ]
              },
              {
                  "par_id": 7,
                  "sentences": [
                      {
                          "sent": "In this work, we propose a language-and domain-independent automatic text summarization approach by sentence extraction using an unsupervised learning algorithm.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Our hypothesis is that an unsupervised algorithm can help for clustering similar ideas (sentences).",
                          "tag": "Method"
                      },
                      {
                          "sent": "Then, for composing the summary, the most representative sentence is selected from each cluster.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In addition, this approach lets to control in some degree the number of words in the generated summary.",
                          "tag": "Claim"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Related Work",
          "selected_sentences": [
              {
                  "par_id": 10,
                  "sentences": [
                      {
                          "sent": "Ideally, a text summarization system should \"understand\" (analyze) the text and express its main contents by generating the text of the summary.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "For example, Cristea et al [9] perform sentence weighting according to their proximity to the central idea of the text, which is determined by analysis of the discourse structure.",
                          "tag": "Claim"
                      }
                  ]
              },
              {
                  "par_id": 12,
                  "sentences": [
                      {
                          "sent": "Supervised learning methods consider sentence selection as classification: they train a classifier using a collection of documents supplied with existing summaries.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "As features of a sentence, such methods can consider text units (in which case we can speak of term selection) or other, non-lexical characteristics.",
                          "tag": "Method"
                      },
                      {
                          "sent": "VillatoroTello et al [4] use as terms n-grams found in the text.",
                          "tag": "Method"
                      },
                      {
                          "sent": "Kupiec et al [10] use predefined cue phrases (this makes the method language-and domain-dependent) as well as non-lexical features such as the position and length of the sentence; their sentence weighting procedure also includes measuring the overlap of the sentence with the title of the document.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "HaCohenKerner et al [3] consider many other lexical and non-lexical features, such as the position of the sentence in the paragraph.",
                          "tag": "Claim"
                      }
                  ]
              },
              {
                  "par_id": 16,
                  "sentences": [
                      {
                          "sent": "The latter idea can be applied directly to sentence weighting without term weighting: a sentence is important if it is related to many important sentences, where relatedness can be understood as, say, overlap of the lexical contents of the sentences [13].",
                          "tag": "Claim"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "General Scheme of the Proposed Approach",
          "selected_sentences": [
              {
                  "par_id": 20,
                  "sentences": [
                      {
                          "sent": "Usually an extractive summarization approach performs term selection, term weighting, sentence weighting, and sentence selection steps.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "However, the strategy of sentence selection step is reduced to simply taking the sentences with highest weight.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Even though this strategy works well for the first ranked sentence, the strategy could lead for sentences similar to the first one to tend to be ranked after the first one; producing redundant sentences in the summary.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "This problem affects negatively in recall measure.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "In this sense, we propose to substitute the sentence weighting and sentence selection steps, with an unsupervised learning algorithm.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Our hypothesis is that an unsupervised learning algorithm could help for automatically detecting the groups of similar sentences from which is selected the most representative sentence; reducing in this way the redundancy in the summary.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "In this section, we describe the general steps that are followed in the proposed approach.",
                          "tag": "Claim"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Term Selection",
          "selected_sentences": []
      },
      {
          "section_name": "Term Weighting",
          "selected_sentences": [
              {
                  "par_id": 26,
                  "sentences": [
                      {
                          "sent": "Inverse Document Frequency (IDF) was proposed by Salton [21] for improving information retrieval systems (IR).",
                          "tag": "Claim"
                      },
                      {
                          "sent": "The problem of TF weighting in IR is that, when a term appears in almost all the documents in the collection; this term is useless for discriminating relevant documents.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "For example, the stop-word and could have a high TF, but it is useless for discriminating the relevant documents since tends to appear in most of the documents.",
                          "tag": "Claim"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "TF-IDF.",
          "selected_sentences": []
      },
      {
          "section_name": "Sentence Selection Using an Unsupervised Learning",
          "selected_sentences": [
              {
                  "par_id": 33,
                  "sentences": [
                      {
                          "sent": "In this step, we propose to use an unsupervised algorithm for discovering the groups of sentences with similar meaning.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Then, we can select the most representative sentence from each group in order to compose the summary.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In particular, we propose to use the well-known K-means algorithm, which assumes that the number of clusters is previously known.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "Sometimes this characteristic is a disadvantage in K-means, however in our proposed approach is an advantage because let to specify the number of groups to create what allowed, at the same time, to estimate the number of words in the final summary.",
                          "tag": "Method"
                      },
                      {
                          "sent": "For example, if the average of words per sentence is 20 and a user desires a 100-word summary then K-means must create 5 clusters, obviously this is only an estimation of the number of words in the final summary.",
                          "tag": "Method"
                      },
                      {
                          "sent": "K-means represents each sentence in a vector space model.",
                          "tag": "Method"
                      },
                      {
                          "sent": "So, each document is represented as a vector of features, where the features correspond to the different terms in the document, in this case n-grams.",
                          "tag": "Method"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Experimental Results",
          "selected_sentences": [
              {
                  "par_id": 36,
                  "sentences": [
                      {
                          "sent": "We have conducted several experiments to verify our hypotheses formulated in the previous section.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 37,
                  "sentences": [
                      {
                          "sent": "Algorithm : In each experiment, we followed the standard sequence of steps:",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 38,
                  "sentences": [
                      {
                          "sent": "Preprocessing: eliminate stop-words, then apply Porter stemming [24]; Term selection: decide which size of n-grams as features are to be used to describe the sentences; Term weighting: decide how the importance of each feature is to be calculated, it can be BOOL, TF, IDF or TFIDF; Sentence clustering: decide the initial seeds for the K-means algorithm, in this case Baseline sentences; Sentence selection: after K-means finishes, select the closest sentence (most representative sentence) to each centroid for composing the summary; The specific settings for each step varied between the experiments and are explained below for each experiment.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 39,
                  "sentences": [
                      {
                          "sent": "We used the standard DUC 2002 collection [11].",
                          "tag": "Method"
                      },
                      {
                          "sent": "In particular, we used the data set of 567 news articles of different length and with different topics.",
                          "tag": "Method"
                      },
                      {
                          "sent": "Each document in the DUC collection is supplied with a set of human-generated summaries provided by two different experts. 1 While each expert was asked to generate summaries of different length, we used only the 100-word variants.",
                          "tag": "Method"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Comparison",
          "selected_sentences": [
              {
                  "par_id": 45,
                  "sentences": [
                      {
                          "sent": "The comparison of the best F-measure results of our proposed approach with the above state-of-the-art approaches is presented in table 4. In this table, it is possible to observe that the difference between the worst and best approach is 0.09251.",
                          "tag": "Result"
                      },
                      {
                          "sent": "It difference was calculate in order to show that a centesimal or millesimal increase in Fmeasure is significant.",
                          "tag": "Result"
                      },
                      {
                          "sent": "The difference between Baseline (first) and Ledeneva [11] is 0.00105; and between Ledeneva [11] and TextRank [14] is 0.00051; however, the difference between TextRank [14] and our proposed approach is 0.00456.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In addition, we calculate the difference between recall and precision in order to show how our proposed method gets the best balance between recall and precision.",
                          "tag": "Result"
                      },
                      {
                          "sent": "In addition, it is interesting to observe that, in comparison with Baseline (first), our approach obtained better recall results in all the experiments, while the precision was worse in all the experiments.",
                          "tag": "Result"
                      },
                      {
                          "sent": "Nevertheless, our proposed approach obtains better F-measure results than Baseline (first), except for 1-gram and BOOL weighting.",
                          "tag": "Result"
                      },
                      {
                          "sent": "It is good to mention the best recall result was obtained by our proposed approach.",
                          "tag": "Claim"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Discussion and Conclusions",
          "selected_sentences": [
              {
                  "par_id": 46,
                  "sentences": [
                      {
                          "sent": "In this work, we proposed an extractive automatic text summarization approach by sentence extraction using an unsupervised learning algorithm.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In particular, the Kmeans algorithm for creating groups of similar sentences was used.",
                          "tag": "Method"
                      },
                      {
                          "sent": "Then, from the groups of sentences, the most representative sentence was selected for composing the summary.",
                          "tag": "Method"
                      },
                      {
                          "sent": "Normally, the definition of the number of groups to form and the initial seeds of the groups are considered as disadvantages of K-means.",
                          "tag": "Method"
                      },
                      {
                          "sent": "However, these parameters are used to take advantage of Baseline sentences in order to improve the quality of the summaries.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The proposed approach, in contrast to supervised methods, does not need large amount of golden samples for training.",
                          "tag": "Conclusion"
                      },
                      {
                          "sent": "Therefore, our proposed approach is more independent from language and dominion.",
                          "tag": "Result"
                      }
                  ]
              },
              {
                  "par_id": 47,
                  "sentences": [
                      {
                          "sent": "According to experimental results we demonstrate that the proposed approach obtains more favorable results than others state-of-the-art approaches; ranking our proposed approach in second place, very close to the first place.",
                          "tag": "Result"
                      },
                      {
                          "sent": "In addition, our proposed approach outperforms the Baseline (first) heuristic for F-measure results, except for 1gram and BOOL weighting.",
                          "tag": "Result"
                      }
                  ]
              }
          ]
      }
  ]
}

export default DataSummaryPaper;