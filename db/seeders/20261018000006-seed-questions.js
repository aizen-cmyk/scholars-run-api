'use strict';

const topics = [
  'Which planet is known as the Red Planet?',
  'What is the chemical formula for water?',
  'Which is the largest ocean on Earth?',
  'How many sides does a hexagon have?',
  'Which gas do plants absorb from the atmosphere?',
  'What is at the center of our solar system?',
  'Which instrument is used to measure temperature?',
  'Which continent contains the Sahara Desert?',
  'Which language is primarily used to structure web pages?',
  'What is 12 multiplied by 8?'
];

module.exports = {
  async up(queryInterface) {
    const locations = [
      { id: 1, name: 'Admin Building', count: 5 },
      { id: 2, name: 'Manggahan', count: 5 },
      { id: 3, name: 'Clinic', count: 5 },
      { id: 4, name: 'Library', count: 5 },
      { id: 5, name: 'ICT', count: 5 },
      { id: 6, name: 'CICT', count: 5 },
      { id: 7, name: 'BME', count: 5 },
      { id: 8, name: 'Social Hall', count: 10 }
    ];
    const now = new Date();
    const questions = [];
    let questionId = 1;

    for (const location of locations) {
      for (let index = 0; index < location.count; index += 1) {
        questions.push({
          question_id: questionId,
          location_id: location.id,
          question_text: `${location.name}: ${topics[index]}`,
          created_at: now,
          updated_at: now
        });
        questionId += 1;
      }
    }

    await queryInterface.bulkInsert('questions', questions, { ignoreDuplicates: true });
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('questions', null, {});
  }
};