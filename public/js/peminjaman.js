let editId = null;

loadBuku();
loadData();

function loadBuku() {

fetch("/api/buku")

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(item=>{

html+=`
<option value="${item.id}">
${item.judul}
</option>
`;

});

document.getElementById("buku").innerHTML=html;

});

}

function loadData(){

fetch("/api/peminjaman")

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(item=>{

html+=`

<tr>

<td>${item.nama}</td>

<td>${item.judul}</td>

<td>${item.status}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="edit(${item.id},'${item.nama}',${item.buku_id},'${item.status}')">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="hapus(${item.id})">

Hapus

</button>

</td>

</tr>

`;

});

document.getElementById("data").innerHTML=html;

});

}

function simpan(){

const data={

nama:document.getElementById("nama").value,

buku_id:document.getElementById("buku").value,

status:document.getElementById("status").value

};

if(editId==null){

fetch("/api/peminjaman",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

}else{

fetch("/api/peminjaman/"+editId,{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

editId=null;

}

setTimeout(loadData,500);

}

function edit(id,nama,buku,status){

editId=id;

document.getElementById("nama").value=nama;

document.getElementById("buku").value=buku;

document.getElementById("status").value=status;

}

function hapus(id){

fetch("/api/peminjaman/"+id,{

method:"DELETE"

});

setTimeout(loadData,500);

}