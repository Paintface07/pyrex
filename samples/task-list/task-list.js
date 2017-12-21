window.onload = function() {
    let wrapper = Pyrex('.main-content');
    Pyrex('.task-init').click(() => {
        wrapper.append(createTaskForm());
    });

    function createCard(title, description, options) {
        let card = Pyrex('!div').addClass('card');
        let cardBody = Pyrex('!div')
            .addClass('card-body')
            .append(Pyrex('!h4')
                .append(Pyrex("#!" + title)))
            .append(Pyrex('!p')
                .append(Pyrex("#!" + description)));

        if(options.complete) {
            let completeLink = Pyrex('!a')
                .addClass('card-link')
                .link('#')
                .append(Pyrex("#!" + options.complete))
                .click(() => {
                    card.remove();
                });

            cardBody.append(completeLink);
        }
        card.append(cardBody);

        return card;
    }

    function createTaskForm() {
        let taskTitleInput = Pyrex('!input');
        let taskDescInput = Pyrex('!input');

        let taskCard = Pyrex('!div')
            .addClass('card')
            .append(Pyrex('!div')
                .addClass('card-body')
                .append(Pyrex('!h4')
                    .append(Pyrex('#!Create a Task')))
                .append(Pyrex('!form')
                    .append(Pyrex('!div')
                        .append(Pyrex('!label')
                            .append(Pyrex('#!Task Title:')))
                        .append(taskTitleInput))
                    .append(Pyrex('!div')
                        .append(Pyrex('!label')
                            .append(Pyrex('#!Task Description:')))
                        .append(taskDescInput)))
                .append(Pyrex('!a')
                    .link('#')
                    .addClass('btn')
                    .addClass('btn-primary')
                    .append(Pyrex('#!Create task'))
                    .click(() => {
                        wrapper.append(createCard(taskTitleInput.value, taskDescInput.value, { complete: 'Complete' }));
                        taskTitleInput.value = '';
                        taskDescInput.value = '';
                        taskCard.remove();
                    }))
                .append(Pyrex('!a')
                    .link('#')
                    .addClass('btn')
                    .addClass('btn-link')
                    .append(Pyrex('#!Cancel'))
                    .click(() => {
                        taskCard.remove();
                    })));

        return taskCard;
    }
};
