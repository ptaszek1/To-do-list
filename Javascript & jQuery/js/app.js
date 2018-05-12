document.addEventListener('DOMContentLoaded', function () {
$(function () {


const topic = document.querySelector('.todo input');
const textarea = document.querySelector('.todo textarea');
const button = document.querySelector('.todo button');
const checkboxes = document.querySelectorAll('.checkboxes input');
const toDoLists = document.querySelector('.to-do-lists');





//Geting time in good format with 0 if seconds, minutes or hours are from 1 to 9

    let myDate = new Date();

    setInterval(function () {
        myDate = new Date();
    },1000)

    let myDateString;
    let myTimeString;

    function whatTime() {
        myDate.setDate(myDate.getDate() + 20);
        myDateString = ('0' + myDate.getDate()).slice(-2) + '/' + ('0' + (myDate.getMonth()+1)).slice(-2) + '/' + myDate.getFullYear();
        myTimeString = (myDate.getHours()<10?'0':'') +myDate.getHours()+':'+(myDate.getMinutes()<10?'0':'')+myDate.getMinutes()+':'+(myDate.getSeconds()<10?'0':'') + myDate.getSeconds()
    }


    let classList;
    let id = 1;

    //Function with colors for level of important task

    function changeColor() {
        checkboxes.forEach((value) => {
            if (value.checked === true) {
                if (value.dataset.color === 'red') {
                    classList = 'red-shadow';
                    id = 1;
                }
                if (value.dataset.color === 'yellow') {
                    classList = 'yellow-shadow';
                    id = 2;
                }
                if (value.dataset.color === 'green') {
                    classList = 'green-shadow';
                    id = 3;
                }
            }
        })
    }


    // Add new elements to html every time you add new task.

    let newArr = [];

    function countArray() {
        newArr.push(id)
    }

    button.addEventListener('click',() => {
        if(topic.value.length >= 4 & textarea.value.length >= 5){
            whatTime();
            changeColor();
            const elements = `<div class="list-elem ${classList}" data-id=${id}>
                <div class="to-do-date">
                    <h3>${myDateString + ' ' + myTimeString}</h3>
                </div>
                <i class="fas fa-times" style="display: flex;"></i>
                <div class="to-do-topic">
                    <h1>${topic.value}</h1>
                </div>
                <div class="to-do-text">
                    <p>${textarea.value}</p>
                </div>
            </div>`;
            toDoLists.insertAdjacentHTML('beforeend', elements);
            topic.value = '';
            textarea.value = '';
            getElement();
        countArray()
        } else {
            alert('Required fields have not been filled out\n' +
                '* Topic min. 4 letters\n' +
                '* Task  min. 5 letters')
        }
    });

    // Sorting elements by : important , lowest and date

    console.log(newArr)

    function importantOption() {
        var items = $('.list-elem');
        items.sort(function(a, b){
            return $(a).data('id') - $(b).data('id');
        });
        items.appendTo('.to-do-lists');
    }

    function lowestOption() {
        var items = $('.list-elem');
        items.sort(function(a, b){
            return $(b).data('id') - $(a).data('id');
        });
        items.appendTo('.to-do-lists');
    }


    // Remove element on click X

    function getElement() {
            $('.fa-times').on('click', function () {
               $(this).parent().remove()
            })
    }

    // Choose selected option here

    let $select = $('.select select');

    function test() {
        let $select2 = $('.select option:selected');
        $select2.each(function() {
            if ($(this).val() === 'important') {
                importantOption()
            } else if ($(this).val() === 'lowest') {
                lowestOption()
            }
        })
    }

    $select.change(function () {
        test()
    })





})
});