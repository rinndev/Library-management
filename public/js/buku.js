let editId = null;

function loadData() {
    fetch("/api/buku")
        .then(res => res.json())
        .then(data => {

            let html = "";

            data.forEach(buku => {

                html += `
                <tr>
                    <td>${buku.judul}</td>
                    <td>${buku.penulis}</td>
                    <td>${buku.stok}</td>

                    <td>

                    <button
                    class="btn btn-warning btn-sm"
                    onclick="edit(${buku.id},'${buku.judul}','${buku.penulis}',${buku.stok})">
                    Edit
                    </button>

                    <button
                    class="btn btn-danger btn-sm"
                    onclick="hapus(${buku.id})">
                    Hapus
                    </button>

                    </td>

                </tr>
                `;

            });

            document.getElementById("data").innerHTML = html;

        });
}

function simpan(){

const judul=document.getElementById("judul").value;
const penulis=document.getElementById("penulis").value;
const stok=document.getElementById("stok").value;

const data={judul,penulis,stok};

if(editId==null){

fetch("/api/buku",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

}else{

fetch("/api/buku/"+editId,{

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

function edit(id,judul,penulis,stok){

editId=id;

document.getElementById("judul").value=judul;

document.getElementById("penulis").value=penulis;

document.getElementById("stok").value=stok;

}

function hapus(id){

fetch("/api/buku/"+id,{
method:"DELETE"
});

setTimeout(loadData,500);

}

loadData();