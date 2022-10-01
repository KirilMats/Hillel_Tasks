const addNumbersTable = function() {
    const _numbersTableWrapper = document.querySelector('.js--numsTable_wrapper');
    const _numbersTable = document.createElement('table');
    _numbersTableWrapper.appendChild(_numbersTable);
    
    for(let i = 0; i < 10; i++) {
       _numbersTable.appendChild(document.createElement('tr'));
    }

    const _tableRows = document.querySelectorAll('.js--numsTable_wrapper table tr');
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < _tableRows.length; j++) {
            _tableRows[i].appendChild(document.createElement('td')).innerHTML = i*_tableRows.length + j + 1;
        }
   }
}

addNumbersTable();