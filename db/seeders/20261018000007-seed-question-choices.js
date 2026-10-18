'use strict';

const choicesByTopic = [
  ['Venus', 'Mars', 'Jupiter', 'Saturn'],
  ['CO2', 'O2', 'H2O', 'NaCl'],
  ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
  ['Five', 'Six', 'Seven', 'Eight'],
  ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
  ['Earth', 'The Sun', 'The Moon', 'Mars'],
  ['Barometer', 'Thermometer', 'Compass', 'Hygrometer'],
  ['Asia', 'Africa', 'Europe', 'South America'],
  ['CSS', 'JavaScript', 'HTML', 'SQL'],
  ['84', '88', '96', '108']
];
const correctIndexes = [1, 2, 3, 1, 2, 1, 1, 1, 2, 2];
const topicsLength = choicesByTopic.length;

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const rows = [];
    let questionId = 1;

    for (const count of [5, 5, 5, 5, 5, 5, 5, 10]) {
      for (let index = 0; index < count; index += 1) {
        const topicIndex = index % topicsLength;
        choicesByTopic[topicIndex].forEach((choice, choiceIndex) => {
          rows.push({
            choice_id: (questionId - 1) * 4 + choiceIndex + 1,
            question_id: questionId,
            choice_text: choice,
            choice_order: choiceIndex + 1,
            is_correct: choiceIndex === correctIndexes[topicIndex],
            created_at: now,
            updated_at: now
          });
        });
        questionId += 1;
      }
    }

    await queryInterface.bulkInsert('question_choices', rows, { ignoreDuplicates: true });
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('question_choices', null, {});
  }
};